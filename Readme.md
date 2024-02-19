# Constant Contact Service API Connector

## Authorization:

- API KEY: Your API key for Constant Contact v2 connect API.
- Authorization: Access Token (Bearer)

## Constant Contact Service Endpoint List

1. Get account summary information

- Description:

  Method to retrieve information about the account.

- Request URI:

  `https://api.constantcontact.com/v2/account/info?api_key=YOUR_API_KEY`

- Response:

  {
    "website": "",
    "organization_name": "Company or Organization Name",
    "time_zone": "US/Eastern",
    "first_name": "",
    "last_name": "LastNameBN",
    "email": "exampl@mail.com",
    "phone": "492222222222",
    "company_logo": "",
    "country_code": "DE",
    "state_code": "",
    "organization_addresses": [
      {
        "city": "Anytown",
        "line1":"123 Maple Street",
        "postal_code":"11111",
        "country_code":"US",
        "state_code":"MA"
      },
      {
        "city": "Anytown",
        "line1":"123 Maple Street",
        "postal_code":"11111",
        "country_code":"US",
        "state_code":"MA"
      },
    ]
  }

2. Get Contacts

- Description:

  Method for retrieving a list of contacts.

- Request URI:

  `https://api.constantcontact.com/v2/contacts?api_key=YOUR_API_KEY`

- Params:

  > email (string: Search for a contact by email address)
  > status (string: Filter the response based on the contact status property: ALL, ACTIVE, UNCONFIRMED, OPTOUT, orREMOVED)
  > limit (integer: Number of contacts to return per page, 1-500, default 50)
  > modified_since (string: Retrieve only contacts modified since the time specified (in ISO-8601 format))

- Response:

  {
    "meta": {
        "pagination": {}
    },
    "results": [{
      "id": "1592195866",
      "status": "ACTIVE",
      "fax": "",
      "addresses": [],
      "notes": [],
      "confirmed": false,
      "lists": [{
          "id": "1715249046",
          "status": "ACTIVE"
      }],
      "source": "Site Owner",
      "email_addresses": [{
        "id": "043085ba-cda0-11ee-bd86-fa163ee2c965",
        "status": "ACTIVE",
        "confirm_status": "NO_CONFIRMATION_REQUIRED",
        "opt_in_source": "ACTION_BY_OWNER",
        "opt_in_date": "2024-02-17T14:22:44.000Z",
        "email_address": "exampl@mail.com"
      }],
      "prefix_name": "",
      "first_name": "",
      "middle_name": "",
      "last_name": "LastNameBN",
      "job_title": "",
      "company_name": "",
      "home_phone": "",
      "work_phone": "",
      "cell_phone": "",
      "custom_fields": [],
      "created_date": "2024-02-17T14:22:44.000Z",
      "modified_date": "2024-02-17T14:22:44.000Z",
      "source_details": ""
    }]
  }

3. Retrieve a collection of ContactLists

- Description:

  This collection method returns a list of ContactLists.

- Request URI:
  
  `https://api.constantcontact.com/v2/lists?api_key=YOUR_API_KEY`

- Params:

  > modified_since (string: Retrieve only contact lists modified since the time specified (in ISO-8601 format))

- Response:

  [{
    "id": "1715249046",
    "name": "General Interest",
    "status": "ACTIVE",
    "created_date": "2024-02-17T14:22:44.000Z",
    "modified_date": "2024-02-17T14:22:44.000Z",
    "contact_count": 1
  }]

4. Retrieve a list of email campaigns

- Description:

  This collection method returns a list of email campaigns.

- Request URI:

  `https://api.constantcontact.com/v2/emailmarketing/campaigns?api_key=YOUR_API_KEY`

- Params:

  > status (string: Filter the results by campaign status: ALL, DRAFT, RUNNING, SENT, SCHEDULED)
  > limit (integer: limit)
  > modified_since (string: Retrieve only contacts modified since the time specified (in ISO-8601 format))

- Response:

  {
    "meta": {
      "pagination": {
        "next_link": "/v2/emailmarketing/campaigns?next=cGFnZU51bT0yJnBhZ2VTaXplPTI"
      }
    },
    "results": [
      {
        "id": "1100395494220",
        "name": "1357157252225",
        "status": "SENT",
        "modified_date": "2013-01-07T18:51:35.975Z"
      },
      {
        "id": "1100395673356",
        "name": "Update1357593398565",
        "status": "DRAFT",
        "modified_date": "2013-01-07T16:16:43.768Z"
      }
    ]
  }
