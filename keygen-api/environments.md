# [_link_](https://keygen.sh/docs/api/environments/\#environments) Environments

By default, all API requests are made to the nil (global) environment. Other
environments can be created to segment your Keygen resources into buckets,
for example, for an isolated sandbox environment, or a shared production
environment.

An environment can be specified within the `Keygen-Environment` request header,
where the value of the header is an environment's ID or its code. When this
header is omitted, the global environment will be assumed.

```
Keygen-Environment: sandbox
Keygen-Environment: sandbox
content_copy
```

Alternatively, an environment may also be provided in the following ways:

- By using the `environment` query parameter: `?environment=sandbox`

When the provided environment is blank or otherwise invalid, the request will
fail with a `400` bad request error response.

Any resource created within an environment will automatically be assigned
to that environment. Resources cannot be moved between environments.

### Notes on isolation

Depending on the environment's isolation strategy, resources from the nil (global)
environment may be accessible from within another environment. For isolated environments,
no resources are accessible from outside the environment. For shared environments,
resources from the global environment are accessible as read-only resources in the
shared environment, but resources from other isolated or shared environments are
not accessible.

For most use-cases, an isolated environment is likely the best choice. Due to that,
it is the default isolation strategy. An isolated environment will essentially act
as a Keygen account within your Keygen account, completely isolated from other
environments, including the global environment. Resources from the global
environment are not able to authenticate into an isolated environment, with the
exception of admins from the global environment.

Some use-cases, however, may call for a shared environment. For example, you
may have a QA environment that needs to create QA licenses for a policy in
the global environment. With a shared environment, this is possible.
Resources from the global environment are able to authenticate into a shared
environment, unlike with an isolated environment.

When accessing resources of the global environment from within a shared
environment, the global resources will be in a read-only state. You cannot
modify or otherwise mutate resources from outside of their assigned
environment.

Lastly, resource uniqueness, e.g. a license key or user email, is not unique
per-environment; resources remain unique per-account. Please keep this
in mind when creating environments.

#### [_link_](https://keygen.sh/docs/api/environments/\#environments-toc) Table of contents

1. [The environment object](https://keygen.sh/docs/api/environments/#environments-object)
2. [Create an environment](https://keygen.sh/docs/api/environments/#environments-create)
3. [Retrieve an environment](https://keygen.sh/docs/api/environments/#environments-retrieve)
4. [Update an environment](https://keygen.sh/docs/api/environments/#environments-update)
5. [Delete an environment](https://keygen.sh/docs/api/environments/#environments-delete)
6. [List environments](https://keygen.sh/docs/api/environments/#environments-list)
7. [Environment tokens](https://keygen.sh/docs/api/environments/#environments-tokens)

## [_link_](https://keygen.sh/docs/api/environments/\#environments-object) The environment object

Below you will find the various attributes for the environment resource.

### [_link_](https://keygen.sh/docs/api/environments/\#environments-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-object-attrs-name) data.attributes.name

string



The name of the environment.

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-object-attrs-code) data.attributes.code

string



The unique code for the environment. This can be used within the `Keygen-Environment` request header to switch the current environment.

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-object-attrs-isolationStrategy) data.attributes.isolationStrategy

string



The strategy used for isolating the environment from other environments.



###### Options



- `ISOLATED`: The environment will be isolated from all other resources in other environments. This is effectively a separate Keygen account. This is the default.
- `SHARED`: The environment will be shared with the global environment. All resources in the global environment will be available as read-only resources.

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-object-attrs-created) data.attributes.created

timestamp (iso8601)read only



When the environment was created.

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-object-attrs-updated) data.attributes.updated

timestamp (iso8601)read only



When the environment was last updated.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-object-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-object-relationships-account) data.relationships.account

individual



The account that the environment belongs to.


#### Example object

```
{
  "data": {
    "id": "b3ee7987-5309-4c61-9df1-c156a216db7a",
    "type": "environments",
    "attributes": {
      "name": "Sandbox Environment",
      "code": "sandbox",
      "isolationStrategy": "ISOLATED",
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/<account>"
        },
        "data": {
          "type": "accounts",
          "id": "<account>"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a"
    }
  }
}
{
  "data": {
    "id": "b3ee7987-5309-4c61-9df1-c156a216db7a",
    "type": "environments",
    "attributes": {
      "name": "Sandbox Environment",
      "code": "sandbox",
      "isolationStrategy": "ISOLATED",
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/<account>"
        },
        "data": {
          "type": "accounts",
          "id": "<account>"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/environments/\#environments-create) Create an environment

Creates a new environment resource.

### [_link_](https://keygen.sh/docs/api/environments/\#environments-create-permissions) Required permissions

- environment.create

### [_link_](https://keygen.sh/docs/api/environments/\#environments-create-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-create-auths-bearer) Bearer

required



An authentication token with admin privileges.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-create-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-create-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-object-attrs-name) data.attributes.name

stringrequired



The name of the environment.

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-object-attrs-code) data.attributes.code

stringrequired



The unique code for the environment. The code cannot collide with any environments that already exist.

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-object-attrs-isolationStrategy) data.attributes.isolationStrategy

stringoptional



The strategy used for isolating the environment from other environments.



For more information on isolation strategies and their effects, please see [Notes on Isolation](https://keygen.sh/docs/api/environments/#notes-on-isolation).



###### Options



- `ISOLATED`: The environment will be isolated from all other resources in other environments. This is effectively a separate Keygen account. This is the default.
- `SHARED`: The environment will be shared with the global environment. All resources in the global environment will be available as read-only resources.

### [_link_](https://keygen.sh/docs/api/environments/\#environments-create-returns) Returns

A `201 Created` response will be returned along with the new environment object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/environments
https://api.keygen.sh/v1/accounts/<account>/environments
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/environments", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "environments",
      "attributes": {
        "name": "Sandbox Environment",
        "code": "sandbox"
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/environments", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "environments",
      "attributes": {
        "name": "Sandbox Environment",
        "code": "sandbox"
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/environments",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "environments",
      "attributes": {
        "name": "Sandbox Environment",
        "code": "sandbox"
      }
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/environments",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "environments",
      "attributes": {
        "name": "Sandbox Environment",
        "code": "sandbox"
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/environments",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "environments",\
      "attributes": [\
        "name": "Sandbox Environment",\
        "code": "sandbox"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/environments",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "environments",\
      "attributes": [\
        "name": "Sandbox Environment",\
        "code": "sandbox"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("environments", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "environments",
    attributes = new {
      name = "Sandbox Environment",
      code = "sandbox"
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("environments", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "environments",
    attributes = new {
      name = "Sandbox Environment",
      code = "sandbox"
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "environments",
    "attributes" to mapOf(
      "name" to "Sandbox Environment",
      "code" to "sandbox"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/environments")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "environments",
    "attributes" to mapOf(
      "name" to "Sandbox Environment",
      "code" to "sandbox"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/environments")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;
import org.json.*;

import static java.util.Map.ofEntries;
import static java.util.Map.entry;

JSONObject body = new JSONObject(ofEntries(
  entry("data", ofEntries(
    entry("type", "environments"),
    entry("attributes", ofEntries(
      entry("isolationStrategy", "SHARED"),
      entry("name", "QA Environment"),
      entry("code", "qa")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/environments")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;
import org.json.*;

import static java.util.Map.ofEntries;
import static java.util.Map.entry;

JSONObject body = new JSONObject(ofEntries(
  entry("data", ofEntries(
    entry("type", "environments"),
    entry("attributes", ofEntries(
      entry("isolationStrategy", "SHARED"),
      entry("name", "QA Environment"),
      entry("code", "qa")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/environments")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson();
content_copy#include <iostream>
#include <string>
#include <cpprest/http_client.h>
#include <cpprest/filestream.h>

using namespace std;
using namespace web;
using namespace web::http;
using namespace web::http::client;
using namespace web::json;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

value attrs;
attrs["isolationStrategy"] = value::string("SHARED");
attrs["name"] = value::string("QA Environment");
attrs["code"] = value::string("qa");

value data;
data["type"] = value::string("environments");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/environments");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
#include <iostream>
#include <string>
#include <cpprest/http_client.h>
#include <cpprest/filestream.h>

using namespace std;
using namespace web;
using namespace web::http;
using namespace web::http::client;
using namespace web::json;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

value attrs;
attrs["isolationStrategy"] = value::string("SHARED");
attrs["name"] = value::string("QA Environment");
attrs["code"] = value::string("qa");

value data;
data["type"] = value::string("environments");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/environments");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/environments \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "environments",
          "attributes": {
            "name": "Sandbox Environment",
            "code": "sandbox"
          }
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/environments \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "environments",
          "attributes": {
            "name": "Sandbox Environment",
            "code": "sandbox"
          }
        }
      }'
content_copy
```

#### Example response / 201 Created

```
{
  "data": {
    "id": "b3ee7987-5309-4c61-9df1-c156a216db7a",
    "type": "environments",
    "attributes": {
      "name": "Sandbox Environment",
      "code": "sandbox",
      "isolationStrategy": "ISOLATED",
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/<account>"
        },
        "data": {
          "type": "accounts",
          "id": "<account>"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a"
    }
  }
}
{
  "data": {
    "id": "b3ee7987-5309-4c61-9df1-c156a216db7a",
    "type": "environments",
    "attributes": {
      "name": "Sandbox Environment",
      "code": "sandbox",
      "isolationStrategy": "ISOLATED",
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/<account>"
        },
        "data": {
          "type": "accounts",
          "id": "<account>"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/environments/\#environments-retrieve) Retrieve an environment

Retrieves the details of an existing environment.

### [_link_](https://keygen.sh/docs/api/environments/\#environments-retrieve-permissions) Required permissions

- environment.read

### [_link_](https://keygen.sh/docs/api/environments/\#environments-retrieve-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-retrieve-auths-bearer) Bearer

required



An authentication token with admin privileges.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-retrieve-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-retrieve-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-retrieve-params-id) <id>

stringrequired



The identifier (UUID) or code of the environment to be retrieved.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-retrieve-returns) Returns

A `200 OK` response will be returned along with an environment object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/environments/<id>
https://api.keygen.sh/v1/accounts/<account>/environments/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "environments/b3ee7987-5309-4c61-9df1-c156a216db7a",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "environments/b3ee7987-5309-4c61-9df1-c156a216db7a",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
content_copy#include <iostream>
#include <string>
#include <cpprest/http_client.h>
#include <cpprest/filestream.h>

using namespace std;
using namespace web;
using namespace web::http;
using namespace web::http::client;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Accept", "application/json");

req.set_request_uri("/environments/b3ee7987-5309-4c61-9df1-c156a216db7a");
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
#include <iostream>
#include <string>
#include <cpprest/http_client.h>
#include <cpprest/filestream.h>

using namespace std;
using namespace web;
using namespace web::http;
using namespace web::http::client;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Accept", "application/json");

req.set_request_uri("/environments/b3ee7987-5309-4c61-9df1-c156a216db7a");
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "b3ee7987-5309-4c61-9df1-c156a216db7a",
    "type": "environments",
    "attributes": {
      "name": "Sandbox Environment",
      "code": "sandbox",
      "isolationStrategy": "ISOLATED",
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/<account>"
        },
        "data": {
          "type": "accounts",
          "id": "<account>"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a"
    }
  }
}
{
  "data": {
    "id": "b3ee7987-5309-4c61-9df1-c156a216db7a",
    "type": "environments",
    "attributes": {
      "name": "Sandbox Environment",
      "code": "sandbox",
      "isolationStrategy": "ISOLATED",
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/<account>"
        },
        "data": {
          "type": "accounts",
          "id": "<account>"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/environments/\#environments-update) Update an environment

Updates the specified environment resource by setting the values of the parameters
passed. Any parameters not provided will be left unchanged.

**Renaming an environment `code` that is already in use may cause requests using**
**the old environment `code` to fail.** We suggest making sure the existing code
is no longer in use before changing it, to prevent unintended request
failures.

### [_link_](https://keygen.sh/docs/api/environments/\#environments-update-permissions) Required permissions

- environment.update

### [_link_](https://keygen.sh/docs/api/environments/\#environments-update-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-update-auths-bearer) Bearer

required



An authentication token with admin privileges.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-update-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-update-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-update-params-id) <id>

stringrequired



The identifier (UUID) or code of the environment to be updated.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-update-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-update-attrs-name) data.attributes.name

stringoptional



The name of the environment.

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-update-attrs-code) data.attributes.code

stringoptional



The unique code for the environment.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-update-returns) Returns

A `200 OK` response will be returned along with the updated environment object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/environments/<id>
https://api.keygen.sh/v1/accounts/<account>/environments/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "environments",
      "attributes": {
        "code": "production"
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "environments",
      "attributes": {
        "code": "production"
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "environments",
      "attributes": {
        "code": "production"
      }
    }
  })
).json()
import requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "environments",
      "attributes": {
        "code": "production"
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "environments",\
      "attributes": [\
        "code": "production"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "environments",\
      "attributes": [\
        "code": "production"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "environments/b3ee7987-5309-4c61-9df1-c156a216db7a",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "environments",
    attributes = new {
      code = "production"
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "environments/b3ee7987-5309-4c61-9df1-c156a216db7a",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "environments",
    attributes = new {
      code = "production"
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "environments",
    "attributes" to mapOf(
      "code" to "production"
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "environments",
    "attributes" to mapOf(
      "code" to "production"
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;
import org.json.*;

import static java.util.Map.ofEntries;
import static java.util.Map.entry;

JSONObject body = new JSONObject(ofEntries(
  entry("data", ofEntries(
    entry("type", "environments"),
    entry("attributes", ofEntries(
      entry("code", "production")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;
import org.json.*;

import static java.util.Map.ofEntries;
import static java.util.Map.entry;

JSONObject body = new JSONObject(ofEntries(
  entry("data", ofEntries(
    entry("type", "environments"),
    entry("attributes", ofEntries(
      entry("code", "production")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson();
content_copy#include <iostream>
#include <string>
#include <cpprest/http_client.h>
#include <cpprest/filestream.h>

using namespace std;
using namespace web;
using namespace web::http;
using namespace web::http::client;
using namespace web::json;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

value attrs;
attrs["code"] = value::string("production");

value data;
data["type"] = value::string("environments");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/environments/b3ee7987-5309-4c61-9df1-c156a216db7a");
req.set_method(methods::PATCH);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
#include <iostream>
#include <string>
#include <cpprest/http_client.h>
#include <cpprest/filestream.h>

using namespace std;
using namespace web;
using namespace web::http;
using namespace web::http::client;
using namespace web::json;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

value attrs;
attrs["code"] = value::string("production");

value data;
data["type"] = value::string("environments");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/environments/b3ee7987-5309-4c61-9df1-c156a216db7a");
req.set_method(methods::PATCH);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PATCH https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "environments",
          "attributes": {
            "code": "production"
          }
        }
      }'
curl -X PATCH https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "environments",
          "attributes": {
            "code": "production"
          }
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "b3ee7987-5309-4c61-9df1-c156a216db7a",
    "type": "environments",
    "attributes": {
      "name": "Live Environment",
      "code": "production",
      "isolationStrategy": "SHARED",
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/<account>"
        },
        "data": {
          "type": "accounts",
          "id": "<account>"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a"
    }
  }
}
{
  "data": {
    "id": "b3ee7987-5309-4c61-9df1-c156a216db7a",
    "type": "environments",
    "attributes": {
      "name": "Live Environment",
      "code": "production",
      "isolationStrategy": "SHARED",
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/<account>"
        },
        "data": {
          "type": "accounts",
          "id": "<account>"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/environments/\#environments-delete) Delete an environment

Permanently deletes an environment. The environment will immediately be removed, and all
resources in the environment will be queued for removal. It cannot be undone.

### [_link_](https://keygen.sh/docs/api/environments/\#environments-delete-permissions) Required permissions

- environment.delete

### [_link_](https://keygen.sh/docs/api/environments/\#environments-delete-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-delete-auths-bearer) Bearer

required



An authentication token with admin privileges.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-delete-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-delete-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-delete-params-id) <id>

stringrequired



The identifier (UUID) or code of the environment to be deleted.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-delete-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/environments/<id>
https://api.keygen.sh/v1/accounts/<account>/environments/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/environments/db1ff21b-f42f-4623-952b-ca7f2600bded", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/environments/db1ff21b-f42f-4623-952b-ca7f2600bded", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
content_copyimport requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/environments/db1ff21b-f42f-4623-952b-ca7f2600bded",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
import requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/environments/db1ff21b-f42f-4623-952b-ca7f2600bded",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/environments/db1ff21b-f42f-4623-952b-ca7f2600bded",
  method: .delete,
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let status = response.response?.statusCode
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/environments/db1ff21b-f42f-4623-952b-ca7f2600bded",
  method: .delete,
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let status = response.response?.statusCode
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "environments/db1ff21b-f42f-4623-952b-ca7f2600bded",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "environments/db1ff21b-f42f-4623-952b-ca7f2600bded",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/environments/db1ff21b-f42f-4623-952b-ca7f2600bded")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/environments/db1ff21b-f42f-4623-952b-ca7f2600bded")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/environments/db1ff21b-f42f-4623-952b-ca7f2600bded")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/environments/db1ff21b-f42f-4623-952b-ca7f2600bded")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
content_copy#include <iostream>
#include <string>
#include <cpprest/http_client.h>
#include <cpprest/filestream.h>

using namespace std;
using namespace web;
using namespace web::http;
using namespace web::http::client;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Accept", "application/json");

req.set_request_uri("/environments/db1ff21b-f42f-4623-952b-ca7f2600bded");
req.set_method(methods::DELETE);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
#include <iostream>
#include <string>
#include <cpprest/http_client.h>
#include <cpprest/filestream.h>

using namespace std;
using namespace web;
using namespace web::http;
using namespace web::http::client;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Accept", "application/json");

req.set_request_uri("/environments/db1ff21b-f42f-4623-952b-ca7f2600bded");
req.set_method(methods::DELETE);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/environments/db1ff21b-f42f-4623-952b-ca7f2600bded \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/environments/db1ff21b-f42f-4623-952b-ca7f2600bded \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 204 No Content

```
No content
No content
```

## [_link_](https://keygen.sh/docs/api/environments/\#environments-list) List all environments

Returns a list of environments. The environments are returned sorted by creation date,
with the most recent environments appearing first.

### [_link_](https://keygen.sh/docs/api/environments/\#environments-list-permissions) Required permissions

- environment.read

### [_link_](https://keygen.sh/docs/api/environments/\#environments-list-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-list-auths-bearer) Bearer

required



An authentication token with admin privileges.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-list-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-list-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-list-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-list-query-limit) limit

integerdefault=10



A limit on the number of environments to be returned. Limit must be a number between 1 and 100.





```
/v1/accounts/<account>/environments?limit=25
/v1/accounts/<account>/environments?limit=25
```

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-list-query-page) page

object<string, integer>



Object containing page `size` and page `number`. Page size must be a number between 1 and 100.





```
/v1/accounts/<account>/environments?page[size]=15&page[number]=2
/v1/accounts/<account>/environments?page[size]=15&page[number]=2
```


### [_link_](https://keygen.sh/docs/api/environments/\#environments-list-returns) Returns

A `200 OK` response will be returned along with a list of environment objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/environments
https://api.keygen.sh/v1/accounts/<account>/environments
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/environments?limit=15", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/environments?limit=15", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/environments?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/environments?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/environments?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/environments?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("environments", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("environments", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/environments")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/environments")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/environments")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/environments")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson();
content_copy#include <iostream>
#include <string>
#include <cpprest/http_client.h>
#include <cpprest/filestream.h>

using namespace std;
using namespace web;
using namespace web::http;
using namespace web::http::client;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Accept", "application/json");

uri_builder uri("/environments");
uri.append_query("limit", 15);

req.set_request_uri(uri.to_uri());
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
#include <iostream>
#include <string>
#include <cpprest/http_client.h>
#include <cpprest/filestream.h>

using namespace std;
using namespace web;
using namespace web::http;
using namespace web::http::client;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Accept", "application/json");

uri_builder uri("/environments");
uri.append_query("limit", 15);

req.set_request_uri(uri.to_uri());
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/environments?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/environments?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": [\
    {\
      "id": "b3ee7987-5309-4c61-9df1-c156a216db7a",\
      "type": "environments",\
      "attributes": {\
        "name": "Example Feature",\
        "code": "EXAMPLE_FEATURE",\
        "metadata": {},\
        "created": "2017-01-02T20:26:53.464Z",\
        "updated": "2017-01-02T20:26:53.464Z"\
      },\
      "relationships": {\
        "account": {\
          "links": {\
            "related": "/v1/accounts/<account>"\
          },\
          "data": {\
            "type": "accounts",\
            "id": "<account>"\
          }\
        }\
      },\
      "links": {\
        "self": "/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a"\
      }\
    },\
    …\
  ]
}
{
  "data": [\
    {\
      "id": "b3ee7987-5309-4c61-9df1-c156a216db7a",\
      "type": "environments",\
      "attributes": {\
        "name": "Example Feature",\
        "code": "EXAMPLE_FEATURE",\
        "metadata": {},\
        "created": "2017-01-02T20:26:53.464Z",\
        "updated": "2017-01-02T20:26:53.464Z"\
      },\
      "relationships": {\
        "account": {\
          "links": {\
            "related": "/v1/accounts/<account>"\
          },\
          "data": {\
            "type": "accounts",\
            "id": "<account>"\
          }\
        }\
      },\
      "links": {\
        "self": "/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a"\
      }\
    },\
    …\
  ]
}content_copy
```

## [_link_](https://keygen.sh/docs/api/environments/\#environments-tokens) Generate an environment token

Generates a new environment token resource. Environment tokens do not expire.
Environment tokens must be generated in the environment they're for, e.g.
if you're generating a token for a `sandbox` environment, please ensure
you include a `Keygen-Environment: sandbox` header.

**Environment tokens should not be included in any client-facing code, as**
**they offer full access to all of the environment's resources.** Only use
these tokens server-side e.g. to integrate Keygen into a backend system,
consume webhooks, or to manage resources in response to events from
your payment provider.

### [_link_](https://keygen.sh/docs/api/environments/\#environments-tokens-permissions) Required permissions

- environment.tokens.generate

### [_link_](https://keygen.sh/docs/api/environments/\#environments-tokens-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-tokens-auths-bearer) Bearer

required



An authentication token with admin privileges.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-tokens-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-tokens-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-tokens-params-id) <id>

stringrequired



The identifier (UUID) or code of the environment to generate a token for.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-tokens-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-tokens-attrs-name) data.attributes.name

stringoptional



An optional name for the token. This can be used to easily identify tokens at a glance.

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-tokens-attrs-expiry) data.attributes.expiry

timestamp (iso8601)optional



The timestamp for when the token expires. Requests using an expired token will be rejected.

- #### [_link_](https://keygen.sh/docs/api/environments/\#environments-tokens-attrs-permissions) data.attributes.permissions

array<string>default=\["\*"\]



The permissions for the token. Available permissions, dependent on the bearer, are covered [here](https://keygen.sh/docs/api/authorization/#authorization-permissions). By default, it is set to a wildcard `*`, which inherits all permissions from the token bearer.


### [_link_](https://keygen.sh/docs/api/environments/\#environments-tokens-returns) Returns

A `200 OK` response will be returned along with the new token object.
The `token` attribute of the token object, which is used for [authentication](https://keygen.sh/docs/api/authentication/),
is **ONLY** readable directly after creation. Please securely store this
value for later use, otherwise the token may need to be regenerated.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/environments/<id>/tokens
https://api.keygen.sh/v1/accounts/<account>/environments/<id>/tokens
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>",
    "Keygen-Environment": "sandbox"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>",
    "Keygen-Environment": "sandbox"
  }
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>",
    "Keygen-Environment": "sandbox"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>",
    "Keygen-Environment": "sandbox"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens",
  method: .post,
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>",\
    "Keygen-Environment": "sandbox"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens",
  method: .post,
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>",\
    "Keygen-Environment": "sandbox"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Keygen-Environment", "sandbox");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");
request.AddHeader("Keygen-Environment", "sandbox");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .header("Keygen-Environment", "sandbox")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .header("Keygen-Environment", "sandbox")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .header("Keygen-Environment", "sandbox")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .header("Keygen-Environment", "sandbox")
  .asJson();
content_copy#include <iostream>
#include <string>
#include <cpprest/http_client.h>
#include <cpprest/filestream.h>

using namespace std;
using namespace web;
using namespace web::http;
using namespace web::http::client;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Accept", "application/json");
req.headers().add("Keygen-Environment", "sandbox");

req.set_request_uri("/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
#include <iostream>
#include <string>
#include <cpprest/http_client.h>
#include <cpprest/filestream.h>

using namespace std;
using namespace web;
using namespace web::http;
using namespace web::http::client;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Accept", "application/json");
req.headers().add("Keygen-Environment", "sandbox");

req.set_request_uri("/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -H 'Keygen-Environment: sandbox'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a/tokens \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -H 'Keygen-Environment: sandbox'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "07d52aa8-b96c-4b55-b05d-f5f570e1775a",
    "type": "tokens",
    "attributes": {
      "kind": "environment-token",
      "token": "env-2ddd064509b6bcaa356958dcce6da3a538919e13ddbc26b359fb374ff89dfacav3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "permissions": ["user.create", "license.create", "license.users.attach"],
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/<account>"
        },
        "data": {
          "type": "accounts",
          "id": "<account>"
        }
      },
      "bearer": {
        "links": {
          "related": "/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a"
        },
        "data": {
          "type": "environments",
          "id": "b3ee7987-5309-4c61-9df1-c156a216db7a"
        }
      }
    }
  }
}
{
  "data": {
    "id": "07d52aa8-b96c-4b55-b05d-f5f570e1775a",
    "type": "tokens",
    "attributes": {
      "kind": "environment-token",
      "token": "env-2ddd064509b6bcaa356958dcce6da3a538919e13ddbc26b359fb374ff89dfacav3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "permissions": ["user.create", "license.create", "license.users.attach"],
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/<account>"
        },
        "data": {
          "type": "accounts",
          "id": "<account>"
        }
      },
      "bearer": {
        "links": {
          "related": "/v1/accounts/<account>/environments/b3ee7987-5309-4c61-9df1-c156a216db7a"
        },
        "data": {
          "type": "environments",
          "id": "b3ee7987-5309-4c61-9df1-c156a216db7a"
        }
      }
    }
  }
}content_copy
```

_cookie_
Dismiss Settings


### Cookies

##### First-party Cookies

- Keygen
[x]

We use cookies to store your tracking preferences, and if you have a
Keygen account, to store session data. These cookies are required. For
more information, see our [Privacy Policy](https://keygen.sh/privacy/#2-3-cookies).



##### Third-party Cookies

- Fathom Analytics
[ ]

We use the [Fathom](https://usefathom.com/ref/YIFTJ2)
service to count website visitors. Fathom is privacy-focused and fully GDPR compliant.
No cookies are used.


- Rewardful
[x]

We use the [Rewardful](https://www.getrewardful.com/?via=keygen)
service to track and count referrals for our affiliate program.



This service is only loaded when `?via=` is included in the URL.
Enabling this may credit the person who referred you.



For more information on how we use cookies, please review our
[Privacy Policy](https://keygen.sh/privacy/#2-3-cookies).