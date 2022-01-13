import { isConstructorDeclaration } from "typescript";
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
  console.log(
    `Making ${method} request to ${url} with body: ${JSON.stringify(body)}`
  );
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
  console.log(`Added ${response} contribution`);
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
      contributionId,
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
  console.log(`Added ${response} user`);
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
