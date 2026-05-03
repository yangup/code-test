# C1. How would you prove that our Xero API connection is working before checking invoices?
Before querying for invoices, you should call the Organisation Endpoint to verify the connection.
1. Action: Perform a GET request to /api.xro/2.0/Organisation.
2. Reasoning: According to the documentation structure, the Organisation endpoint is a standard "Hello World" type of call. 
If this returns a 200 OK response with organisation details (such as name, version, and base currency), 
it confirms that your authentication (OAuth 2.0) is valid and your application has established a successful connection 
to the Xero API.


# C2. If /connections works but GET /Invoices fails, what would you check?

If the connection check passes but fetching invoices fails, the issue is likely related to scope permissions or tenant context:
1. Scopes: Verify that your access token includes the accounting.transactions or accounting.transactions.read scope. The /connections endpoint only checks if the app is connected to Xero, not if it has permission to read specific data like invoices.
2. Xero-Tenant-Id: Ensure you are passing the correct Xero-Tenant-Id (the specific Xero organisation ID) in the request header. Without specifying the correct tenant, the API won't know which organisation's invoices to retrieve.
3. Data Existence: Check if there are actually any invoices present in the connected organisation, though this would typically return an empty array rather than an error.






# C3. What endpoint would you call to check invoices?
To retrieve a list of invoices, you would call the Invoices Endpoint.
1. Endpoint: GET /api.xro/2.0/Invoices
2. Function: This endpoint allows you to retrieve multiple invoices and supports filtering by parameters such as Status, Date, or ContactID as mentioned in the documentation overview.




# C4. How would you check one specific invoice?

To retrieve the details of a single, specific invoice, you need to use the Invoices Endpoint with the Invoice ID.
1. Endpoint: GET /api.xro/2.0/Invoices/{InvoiceID}
2. Function: Replace {InvoiceID} with the specific GUID of the invoice you want to view. This will return the full details of that specific invoice, including line items, totals, and status.



# C5. If the invoice API returns 429, how should the backend handle it?

A 429 status code indicates Rate Limit Exceeded (as referenced in the documentation's "Requests, Responses & Limits" section).
Handling Strategy: The backend should implement an Exponential Backoff strategy.
1. Read Headers: Check the Retry-After header in the response, which tells you how many seconds to wait.
2. Pause & Retry: The backend should pause execution for the duration specified (or use an exponential delay) before retrying the request.
3. Avoid Spamming: Do not immediately retry the request, as this will continue to trigger the rate limiter and potentially extend the blocking period.
