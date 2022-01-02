import {
  AddContributionResponse,
  AddContributionRequest,
} from "../types/common/server-api";

const ApiUrl = process.env.API_URL || "http://localhost:3001";

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
  return response.json();
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
