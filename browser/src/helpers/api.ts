import {
  AddContributionResponse,
  AddContributionRequest,
  GetContributionRequest,
  Contribution,
  GetContributionsRequest,
  AddUserRequest,
  Author,
  AddUserResponse,
  GetUserRequest,
  GetUsersRequest,
  VerifyTwitterRequest,
  GetStatsResponse,
} from "../types/common/server-api";

export function withQueryParams(
  url: string,
  params: Record<string, string>
): string {
  const definedParams = Object.fromEntries(
    Object.entries(params).flatMap(([key, val]) =>
      val === undefined ? [] : [[key, val]]
    )
  );
  const query = new URLSearchParams(definedParams);

  const queryString = query.toString();
  return queryString.length ? `${url}?${queryString}` : url;
}

const ApiUrl =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : "http://localhost:3001";

async function makeRequest(
  url: string,
  { method, body }: { method: string; body?: object }
): Promise<any> {
  const response = await fetch(url, {
    // redirect: "follow", // manual, *follow, error
    mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    method,
    body: JSON.stringify(body),
  });
  const text = await response.text();
  const jsonResponse = text.length ? JSON.parse(text) : undefined;
  if (!response.ok) {
    throw new Error(jsonResponse?.error || response.statusText);
  }
  return jsonResponse;
}

// TODO: maybe enrich with location data?
// http://ipinfo.io
export async function addContribution(
  request: AddContributionRequest
): Promise<AddContributionResponse> {
  const response = await makeRequest(`${ApiUrl}/contributions`, {
    body: request,
    method: "POST",
  });
  return response as AddContributionResponse;
}

export async function getContribution({
  id,
}: GetContributionRequest): Promise<Contribution> {
  const response = await makeRequest(`${ApiUrl}/contributions/${id}`, {
    method: "GET",
  });
  return response as Contribution;
}

export async function getContributions({
  offset,
  contributionId,
}: GetContributionsRequest): Promise<Contribution[]> {
  const response = await makeRequest(
    withQueryParams(`${ApiUrl}/contributions`, {
      offset: offset ? String(offset) : offset,
      contributionId: contributionId ? String(contributionId) : contributionId,
    }),
    {
      method: "GET",
    }
  );
  return response as Contribution[];
}

export async function getUser({
  id,
}: GetUserRequest): Promise<Author | undefined> {
  const response = await makeRequest(`${ApiUrl}/users/${id}`, {
    method: "GET",
  });
  return response as Author | undefined;
}

export async function getUsers({ offset }: GetUsersRequest = {}): Promise<
  Author[]
> {
  const response = await makeRequest(
    withQueryParams(`${ApiUrl}/users`, {
      offset: offset ? String(offset) : offset,
    }),
    {
      method: "GET",
    }
  );
  return response as Author[];
}

export async function addUser(
  request: AddUserRequest
): Promise<AddUserResponse> {
  const response = await makeRequest(`${ApiUrl}/users`, {
    body: request,
    method: "POST",
  });
  return response as AddUserResponse;
}

export async function verifyTwitter(
  request: VerifyTwitterRequest
): Promise<void> {
  await makeRequest(`${ApiUrl}/twitter/verify`, {
    body: request,
    method: "POST",
  });
}

export async function getStats(): Promise<GetStatsResponse> {
  return makeRequest(`${ApiUrl}/stats`, { method: "GET" });
}

// FOR ARWEAVE //

interface Tag {
  name: string;
  value: string;
}

interface Edge {
  node: {
    id: string;
    tags: {
      find: (fn: (t: Tag) => boolean) => Tag;
    };
  };
}

export interface ArweaveEssayTransaction {
  transactionId: string;
  version: number;
}

function getVersionForArweaveTransaction(edge: Edge): number {
  return (
    parseInt(
      edge.node.tags.find((tag: Tag) => tag.name === "DOC_VERSION").value
    ) || 0
  );
}

export async function fetchLatestArweaveEssay(): Promise<ArweaveEssayTransaction> {
  const req = await fetch("https://arweave.net/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // TODO: fill in the browser/src/components/EssayBody.tsx not hardcoded
    // TODO: fill in owner address from environment variable
    body: JSON.stringify({
      query: `
      query {
        transactions(
          tags: [
            {
              name: "DOC_NAME",
              values: ["pluriverse:browser/src/components/EssayBody.tsx"]
            }
          ],
          owners: ["aek33fcNH1qbb-SsDEqBF1KDWb8R1mxX6u4QGoo3tAs"],
        ) {
          edges {
            node {
              id
              tags {
                name
                value
              }
            }
          }
        }
      }
      `,
    }),
  });
  const json = await req.json();
  return (json.data.transactions.edges as Edge[])
    .sort((a, b) => {
      // we reverse sort edges if version is not defined to get latest version
      return (
        getVersionForArweaveTransaction(b) - getVersionForArweaveTransaction(a)
      );
    })
    .map((e) => ({
      transactionId: e.node.id,
      version: getVersionForArweaveTransaction(e),
    }))[0];
}
