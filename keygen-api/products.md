# [_link_](https://keygen.sh/docs/api/products/\#products) Products

#### [_link_](https://keygen.sh/docs/api/products/\#products-toc) Table of contents

1. [The product object](https://keygen.sh/docs/api/products/#products-object)
2. [Create a product](https://keygen.sh/docs/api/products/#products-create)
3. [Retrieve a product](https://keygen.sh/docs/api/products/#products-retrieve)
4. [Update a product](https://keygen.sh/docs/api/products/#products-update)
5. [Delete a product](https://keygen.sh/docs/api/products/#products-delete)
6. [List all products](https://keygen.sh/docs/api/products/#products-list)
7. [Product tokens](https://keygen.sh/docs/api/products/#products-tokens)

## [_link_](https://keygen.sh/docs/api/products/\#products-object) The product object

Below you will find the various attributes for the product resource, as well
as the product resource's relationships.

### [_link_](https://keygen.sh/docs/api/products/\#products-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-attrs-name) data.attributes.name

string



The name of the product.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-attrs-code) data.attributes.code

string



The unique code, or 'slug', for the product. The code cannot collide with any products that already exist.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-attrs-url) data.attributes.url

string



A related URL for the product e.g. the marketing website, company website, etc.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-attrs-distributionStrategy) data.attributes.distributionStrategy

stringdefault=LICENSED



The strategy for distributing releases.



###### Options



- `LICENSED`: Only licensed users, with a valid license, can access releases and release artifacts. API authentication is required.
- `OPEN`: Anybody can access releases. No API authentication required, so this is a great option for rendering releases on a public downloads page, open source projects, or freemium products.
- `CLOSED`: Only admins can access releases. Download links will need to be generated server-side. API authentication is required.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-attrs-platforms) data.attributes.platforms

array<string>



An array of platforms the product supports.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-attrs-permissions) data.attributes.permissions

array<string>



The permissions for the product. Default and available permissions are covered [here](https://keygen.sh/docs/api/authorization/#authorization-permissions).

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-attrs-metadata) data.attributes.metadata

object<string, any>



Object containing product [metadata](https://keygen.sh/docs/api/metadata/).

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-attrs-created) data.attributes.created

timestamp (iso8601)read only



When the product was created.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-attrs-updated) data.attributes.updated

timestamp (iso8601)read only



When the product was last updated.


### [_link_](https://keygen.sh/docs/api/products/\#products-object-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-relationships-account) data.relationships.account

individual



The account that the product belongs to.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-relationships-environment) data.relationships.environment

individual



The environment that the product belongs to.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-relationships-policies) data.relationships.policies

collection



The policies that are associated with the product.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-relationships-licenses) data.relationships.licenses

collection



The licenses that are associated with the product.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-relationships-machines) data.relationships.machines

collection



The machines that are associated with the product.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-relationships-users) data.relationships.users

collection



The users that own a license for the product.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-object-relationships-tokens) data.relationships.tokens

collection



The authentication tokens of the product.


#### Example object

```
{
  "data": {
    "id": "31339351-f7f5-4bdd-8346-5d8399a1ac07",
    "type": "products",
    "links": {
      "self": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07"
    },
    "attributes": {
      "name": "Example App",
      "code": "example",
      "distributionStrategy": "OPEN",
      "url": "https://example.com",
      "platforms": [],
      "permissions": ["license.create", "machine.create", ...],
      "metadata": {},
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
      "policies": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/policies"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/machines"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/users"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "31339351-f7f5-4bdd-8346-5d8399a1ac07",
    "type": "products",
    "links": {
      "self": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07"
    },
    "attributes": {
      "name": "Example App",
      "code": "example",
      "distributionStrategy": "OPEN",
      "url": "https://example.com",
      "platforms": [],
      "permissions": ["license.create", "machine.create", ...],
      "metadata": {},
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
      "policies": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/policies"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/machines"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/users"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/products/\#products-create) Create a product

Creates a new product resource.

### [_link_](https://keygen.sh/docs/api/products/\#products-create-permissions) Required permissions

- product.create

### [_link_](https://keygen.sh/docs/api/products/\#products-create-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/products/\#products-create-auths-bearer) Bearer

required



An authentication token with admin privileges.


### [_link_](https://keygen.sh/docs/api/products/\#products-create-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/products/\#products-create-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/products/\#products-create-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/products/\#products-create-attrs-name) data.attributes.name

stringrequired



The name of the product.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-create-attrs-code) data.attributes.code

stringrequired



The unique code, or 'slug', for the product. The code cannot collide with any products that already exist.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-create-attrs-url) data.attributes.url

stringoptional



A related URL for the product e.g. the marketing website, company website, etc. Must be a valid URL.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-create-attrs-distributionStrategy) data.attributes.distributionStrategy

stringoptionaldefault=LICENSED



The strategy for distributing releases.



###### Options



- `LICENSED`: Only licensed users, with a valid license, can access releases and release artifacts. API authentication is required.
- `OPEN`: Anybody can access releases. No API authentication required, so this is a great option for rendering releases on a public downloads page, open source projects, or freemium products.
- `CLOSED`: Only admins can access releases. Download links will need to be generated server-side. API authentication is required.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-create-attrs-platforms) data.attributes.platforms

array<string>optional



An array of platforms the product supports.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-create-attrs-permissions) data.attributes.permissions

array<string>



The permissions for the product. Default and available permissions are covered [here](https://keygen.sh/docs/api/authorization/#authorization-permissions).

- #### [_link_](https://keygen.sh/docs/api/products/\#products-create-attrs-metadata) data.attributes.metadata

object<string, any>optional



Object containing product [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/products/\#products-create-returns) Returns

A `201 Created` response will be returned along with the new product object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/products
https://api.keygen.sh/v1/accounts/<account>/products
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "products",
      "attributes": {
        "name": "Example On-Premise",
        "url": "https://example.com",
        "platforms": ["iOS", "Android"]
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/products", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "products",
      "attributes": {
        "name": "Example On-Premise",
        "url": "https://example.com",
        "platforms": ["iOS", "Android"]
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/products",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "products",
      "attributes": {
        "name": "Example On-Premise",
        "url": "https://example.com",
        "platforms": ["iOS", "Android"]
      }
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/products",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "products",
      "attributes": {
        "name": "Example On-Premise",
        "url": "https://example.com",
        "platforms": ["iOS", "Android"]
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/products",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "products",\
      "attributes": [\
        "name": "Example On-Premise",\
        "url": "https://example.com",\
        "platforms": ["iOS", "Android"]\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/products",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "products",\
      "attributes": [\
        "name": "Example On-Premise",\
        "url": "https://example.com",\
        "platforms": ["iOS", "Android"]\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("products", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "products",
    attributes = new {
      name = "Example On-Premise",
      url = "https://example.com",
      platforms = new[] { "iOS", "Android" }
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("products", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "products",
    attributes = new {
      name = "Example On-Premise",
      url = "https://example.com",
      platforms = new[] { "iOS", "Android" }
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "products",
    "attributes" to mapOf(
      "name" to "Example On-Premise",
      "url" to "https://example.com",
      "platforms" to listOf("iOS", "Android")
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/products")
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
    "type" to "products",
    "attributes" to mapOf(
      "name" to "Example On-Premise",
      "url" to "https://example.com",
      "platforms" to listOf("iOS", "Android")
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/products")
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
import static java.util.List.of;

JSONObject body = new JSONObject(ofEntries(
  entry("data", ofEntries(
    entry("type", "products"),
    entry("attributes", ofEntries(
      entry("name", "Example On-Premise"),
      entry("url", "https://example.com"),
      entry("platforms", of("iOS", "Android"))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/products")
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
import static java.util.List.of;

JSONObject body = new JSONObject(ofEntries(
  entry("data", ofEntries(
    entry("type", "products"),
    entry("attributes", ofEntries(
      entry("name", "Example On-Premise"),
      entry("url", "https://example.com"),
      entry("platforms", of("iOS", "Android"))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/products")
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

value platforms;
platforms[0] = value::string("iOS");
platforms[1] = value::string("Android");

value attrs;
attrs["name"] = value::string("Example On-Premise");
attrs["url"] = value::string("https://example.com");
attrs["platforms"] = platforms;

value data;
data["type"] = value::string("products");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/products");
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

value platforms;
platforms[0] = value::string("iOS");
platforms[1] = value::string("Android");

value attrs;
attrs["name"] = value::string("Example On-Premise");
attrs["url"] = value::string("https://example.com");
attrs["platforms"] = platforms;

value data;
data["type"] = value::string("products");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/products");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/products \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "products",
          "attributes": {
            "name": "Example On-Premise",
            "url": "https://example.com",
            "platforms": ["iOS", "Android"]
          }
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/products \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "products",
          "attributes": {
            "name": "Example On-Premise",
            "url": "https://example.com",
            "platforms": ["iOS", "Android"]
          }
        }
      }'
content_copy
```

#### Example response / 201 Created

```
{
  "data": {
    "id": "31339351-f7f5-4bdd-8346-5d8399a1ac07",
    "type": "products",
    "links": {
      "self": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07"
    },
    "attributes": {
      "name": "Example On-Premise",
      "code": "on-prem",
      "distributionStrategy": "LICENSED",
      "url": "https://example.com",
      "platforms": ["linux"],
      "permissions": ["license.create", "machine.create", ...],
      "metadata": {},
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
      "policies": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/policies"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/machines"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/users"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "31339351-f7f5-4bdd-8346-5d8399a1ac07",
    "type": "products",
    "links": {
      "self": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07"
    },
    "attributes": {
      "name": "Example On-Premise",
      "code": "on-prem",
      "distributionStrategy": "LICENSED",
      "url": "https://example.com",
      "platforms": ["linux"],
      "permissions": ["license.create", "machine.create", ...],
      "metadata": {},
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
      "policies": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/policies"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/machines"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/users"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/products/\#products-retrieve) Retrieve a product

Retrieves the details of an existing product.

### [_link_](https://keygen.sh/docs/api/products/\#products-retrieve-permissions) Required permissions

- product.read

### [_link_](https://keygen.sh/docs/api/products/\#products-retrieve-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/products/\#products-retrieve-auths-bearer) Bearer

required



An authentication token with privileges to view the resource: either an admin, an environment, or the product.


### [_link_](https://keygen.sh/docs/api/products/\#products-retrieve-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/products/\#products-retrieve-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-retrieve-params-id) <id>

stringrequired



The identifier (UUID) of the product to be retrieved.


### [_link_](https://keygen.sh/docs/api/products/\#products-retrieve-returns) Returns

A `200 OK` response will be returned along with a product object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/products/<id>
https://api.keygen.sh/v1/accounts/<account>/products/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07", {
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
  "https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
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
  "products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07")
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

req.set_request_uri("/products/31339351-f7f5-4bdd-8346-5d8399a1ac07");
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

req.set_request_uri("/products/31339351-f7f5-4bdd-8346-5d8399a1ac07");
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "31339351-f7f5-4bdd-8346-5d8399a1ac07",
    "type": "products",
    "links": {
      "self": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07"
    },
    "attributes": {
      "name": "Example App",
      "code": "example",
      "distributionStrategy": "OPEN",
      "url": "https://example.com",
      "platforms": [],
      "permissions": ["license.create", "machine.create", ...],
      "metadata": {},
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
      "policies": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/policies"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/machines"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/users"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "31339351-f7f5-4bdd-8346-5d8399a1ac07",
    "type": "products",
    "links": {
      "self": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07"
    },
    "attributes": {
      "name": "Example App",
      "code": "example",
      "distributionStrategy": "OPEN",
      "url": "https://example.com",
      "platforms": [],
      "permissions": ["license.create", "machine.create", ...],
      "metadata": {},
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
      "policies": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/policies"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/machines"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/users"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/products/\#products-update) Update a product

Updates the specified product resource by setting the values of the parameters
passed. Any parameters not provided will be left unchanged.

### [_link_](https://keygen.sh/docs/api/products/\#products-update-permissions) Required permissions

- product.update

### [_link_](https://keygen.sh/docs/api/products/\#products-update-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/products/\#products-update-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product.


### [_link_](https://keygen.sh/docs/api/products/\#products-update-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/products/\#products-update-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-update-params-id) <id>

stringrequired



The identifier (UUID) of the product to be updated.


### [_link_](https://keygen.sh/docs/api/products/\#products-update-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/products/\#products-update-attrs-name) data.attributes.name

stringoptional



The name of the product.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-update-attrs-code) data.attributes.code

stringoptional



The unique code, or 'slug', for the product. The code cannot collide with any products that already exist.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-update-attrs-url) data.attributes.url

stringoptional



A related URL for the product e.g. the marketing website, company website, etc. Must be a valid URL.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-update-attrs-distributionStrategy) data.attributes.distributionStrategy

stringoptional



The strategy for distributing releases.



###### Options



- `LICENSED`: Only licensed users, with a valid license, can access releases and release artifacts. API authentication is required.
- `OPEN`: Anybody can access releases. No API authentication required, so this is a great option for rendering releases on a public downloads page, open source projects, or freemium products.
- `CLOSED`: Only admins can access releases. Download links will need to be generated server-side. API authentication is required.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-update-attrs-platforms) data.attributes.platforms

array<string>optional



An array of platforms the product supports.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-update-attrs-permissions) data.attributes.permissions

array<string>



The permissions for the product. Default and available permissions are covered [here](https://keygen.sh/docs/api/authorization/#authorization-permissions).

- #### [_link_](https://keygen.sh/docs/api/products/\#products-update-attrs-metadata) data.attributes.metadata

object<string, any>optional



Object containing product [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/products/\#products-update-returns) Returns

A `200 OK` response will be returned along with the updated product object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/products/<id>
https://api.keygen.sh/v1/accounts/<account>/products/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "products",
      "attributes": {
        "platforms": [\
          "iOS",\
          "Android",\
          "Windows"\
        ]
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "products",
      "attributes": {
        "platforms": [\
          "iOS",\
          "Android",\
          "Windows"\
        ]
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "products",
      "attributes": {
        "platforms": [\
          "iOS",\
          "Android",\
          "Windows"\
        ]
      }
    }
  })
).json()
import requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "products",
      "attributes": {
        "platforms": [\
          "iOS",\
          "Android",\
          "Windows"\
        ]
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "products",\
      "attributes": [\
        "platforms": [\
          "iOS",\
          "Android",\
          "Windows"\
        ]\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "products",\
      "attributes": [\
        "platforms": [\
          "iOS",\
          "Android",\
          "Windows"\
        ]\
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
  "products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  Method.PATCH
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "products",
    attributes = new {
      platforms = new[] { "iOS", "Android", "Windows" }
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  Method.PATCH
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "products",
    attributes = new {
      platforms = new[] { "iOS", "Android", "Windows" }
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "products",
    "attributes" to mapOf(
      "platforms" to listOf("iOS", "Android", "Windows")
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07")
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
    "type" to "products",
    "attributes" to mapOf(
      "platforms" to listOf("iOS", "Android", "Windows")
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07")
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
import static java.util.List.of;

JSONObject body = new JSONObject(ofEntries(
  entry("data", ofEntries(
    entry("type", "products"),
    entry("attributes", ofEntries(
      entry("platforms", of("iOS", "Android", "Windows"))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07")
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
import static java.util.List.of;

JSONObject body = new JSONObject(ofEntries(
  entry("data", ofEntries(
    entry("type", "products"),
    entry("attributes", ofEntries(
      entry("platforms", of("iOS", "Android", "Windows"))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07")
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

value platforms;
platforms[0] = value::string("iOS");
platforms[1] = value::string("Android");
platforms[2] = value::string("Windows");

value attrs;
attrs["platforms"] = platforms;

value data;
data["type"] = value::string("products");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/products/31339351-f7f5-4bdd-8346-5d8399a1ac07");
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

value platforms;
platforms[0] = value::string("iOS");
platforms[1] = value::string("Android");
platforms[2] = value::string("Windows");

value attrs;
attrs["platforms"] = platforms;

value data;
data["type"] = value::string("products");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/products/31339351-f7f5-4bdd-8346-5d8399a1ac07");
req.set_method(methods::PATCH);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PATCH https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "products",
          "attributes": {
            "platforms": [\
              "iOS",\
              "Android",\
              "Windows"\
            ]
          }
        }
      }'
curl -X PATCH https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "products",
          "attributes": {
            "platforms": [\
              "iOS",\
              "Android",\
              "Windows"\
            ]
          }
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "31339351-f7f5-4bdd-8346-5d8399a1ac07",
    "type": "products",
    "links": {
      "self": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07"
    },
    "attributes": {
      "name": "Example App",
      "code": "example",
      "distributionStrategy": "OPEN",
      "url": "https://example.com",
      "platforms": [],
      "metadata": {},
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
      "policies": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/policies"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/machines"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/users"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "31339351-f7f5-4bdd-8346-5d8399a1ac07",
    "type": "products",
    "links": {
      "self": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07"
    },
    "attributes": {
      "name": "Example App",
      "code": "example",
      "distributionStrategy": "OPEN",
      "url": "https://example.com",
      "platforms": [],
      "metadata": {},
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
      "policies": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/policies"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/machines"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/users"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/products/\#products-delete) Delete a product

Permanently deletes a product. It cannot be undone. This action also immediately
deletes any policies, licenses and machines that the product is associated with.

### [_link_](https://keygen.sh/docs/api/products/\#products-delete-permissions) Required permissions

- product.delete

### [_link_](https://keygen.sh/docs/api/products/\#products-delete-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/products/\#products-delete-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product.


### [_link_](https://keygen.sh/docs/api/products/\#products-delete-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/products/\#products-delete-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-delete-params-id) <id>

stringrequired



The identifier (UUID) of the product to be deleted.


### [_link_](https://keygen.sh/docs/api/products/\#products-delete-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/products/<id>
https://api.keygen.sh/v1/accounts/<account>/products/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
content_copyimport requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
import requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
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
  "products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "products/31339351-f7f5-4bdd-8346-5d8399a1ac07",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07")
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

req.set_request_uri("/products/31339351-f7f5-4bdd-8346-5d8399a1ac07");
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

req.set_request_uri("/products/31339351-f7f5-4bdd-8346-5d8399a1ac07");
req.set_method(methods::DELETE);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 204 No Content

```
No content
No content
```

## [_link_](https://keygen.sh/docs/api/products/\#products-list) List all products

Returns a list of products. The products are returned sorted by creation date,
with the most recent products appearing first.

### [_link_](https://keygen.sh/docs/api/products/\#products-list-permissions) Required permissions

- product.read

### [_link_](https://keygen.sh/docs/api/products/\#products-list-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/products/\#products-list-auths-bearer) Bearer

required



An authentication token with admin privileges.


### [_link_](https://keygen.sh/docs/api/products/\#products-list-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/products/\#products-list-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/products/\#products-list-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/products/\#products-list-query-limit) limit

integerdefault=10



A limit on the number of products to be returned. Limit must be a number between 1 and 100.





```
/v1/accounts/<account>/products?limit=25
/v1/accounts/<account>/products?limit=25
```

- #### [_link_](https://keygen.sh/docs/api/products/\#products-list-query-page) page

object<string, integer>



Object containing page `size` and page `number`. Page size must be a number between 1 and 100.





```
/v1/accounts/<account>/products?page[size]=15&page[number]=2
/v1/accounts/<account>/products?page[size]=15&page[number]=2
```


### [_link_](https://keygen.sh/docs/api/products/\#products-list-returns) Returns

A `200 OK` response will be returned along with a list of product objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/products
https://api.keygen.sh/v1/accounts/<account>/products
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/products?limit=15", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/products?limit=15", {
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
  "https://api.keygen.sh/v1/accounts/<account>/products?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/products?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/products?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/products?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("products", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("products", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/products")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/products")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/products")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/products")
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

uri_builder uri("/products");
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

uri_builder uri("/products");
uri.append_query("limit", 15);

req.set_request_uri(uri.to_uri());
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/products?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/products?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": [\
    {\
      "id": "31339351-f7f5-4bdd-8346-5d8399a1ac07",\
      "type": "products",\
      "links": {\
        "self": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07"\
      },\
      "attributes": {\
        "name": "Example App",\
        "code": "example",\
        "distributionStrategy": "OPEN",\
        "url": "https://example.com",\
        "platforms": [],\
        "permissions": ["license.create", "machine.create", ...],\
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
        },\
        "policies": {\
          "links": {\
            "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/policies"\
          }\
        },\
        "licenses": {\
          "links": {\
            "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/licenses"\
          }\
        },\
        "machines": {\
          "links": {\
            "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/machines"\
          }\
        },\
        "users": {\
          "links": {\
            "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/users"\
          }\
        },\
        "tokens": {\
          "links": {\
            "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens"\
          }\
        }\
      }\
    },\
    …\
  ]
}
{
  "data": [\
    {\
      "id": "31339351-f7f5-4bdd-8346-5d8399a1ac07",\
      "type": "products",\
      "links": {\
        "self": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07"\
      },\
      "attributes": {\
        "name": "Example App",\
        "code": "example",\
        "distributionStrategy": "OPEN",\
        "url": "https://example.com",\
        "platforms": [],\
        "permissions": ["license.create", "machine.create", ...],\
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
        },\
        "policies": {\
          "links": {\
            "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/policies"\
          }\
        },\
        "licenses": {\
          "links": {\
            "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/licenses"\
          }\
        },\
        "machines": {\
          "links": {\
            "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/machines"\
          }\
        },\
        "users": {\
          "links": {\
            "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/users"\
          }\
        },\
        "tokens": {\
          "links": {\
            "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens"\
          }\
        }\
      }\
    },\
    …\
  ]
}content_copy
```

## [_link_](https://keygen.sh/docs/api/products/\#products-tokens) Generate a product token

Generates a new product token resource. Product tokens do not expire.

**Product tokens should not be included in any client-facing code, as**
**they offer full access to all of the product's resources.** Only use
these tokens server-side e.g. to integrate Keygen into a backend system,
consume webhooks, or to manage resources in response to events from
your payment provider.

### [_link_](https://keygen.sh/docs/api/products/\#products-tokens-permissions) Required permissions

- product.tokens.generate

### [_link_](https://keygen.sh/docs/api/products/\#products-tokens-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/products/\#products-tokens-auths-bearer) Bearer

required



An authentication token with admin privileges.


### [_link_](https://keygen.sh/docs/api/products/\#products-tokens-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/products/\#products-tokens-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-tokens-params-id) <id>

stringrequired



The identifier (UUID) of the product to generate a token for.


### [_link_](https://keygen.sh/docs/api/products/\#products-tokens-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/products/\#products-tokens-attrs-name) data.attributes.name

stringoptional



An optional name for the token. This can be used to easily identify tokens at a glance.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-tokens-attrs-expiry) data.attributes.expiry

timestamp (iso8601)optional



The timestamp for when the token expires. Requests using an expired token will be rejected.

- #### [_link_](https://keygen.sh/docs/api/products/\#products-tokens-attrs-permissions) data.attributes.permissions

array<string>default=\["\*"\]



The permissions for the token. Available permissions, dependent on the bearer, are covered [here](https://keygen.sh/docs/api/authorization/#authorization-permissions). By default, it is set to a wildcard `*`, which inherits all permissions from the token bearer.


### [_link_](https://keygen.sh/docs/api/products/\#products-tokens-returns) Returns

A `200 OK` response will be returned along with the new token object.
The `token` attribute of the token object, which is used for [authentication](https://keygen.sh/docs/api/authentication/),
is **ONLY** readable directly after creation. Please securely store this
value for later use, otherwise the token may need to be regenerated.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/products/<id>/tokens
https://api.keygen.sh/v1/accounts/<account>/products/<id>/tokens
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens",
  method: .post,
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens",
  method: .post,
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
  "products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens")
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

req.set_request_uri("/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens");
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

req.set_request_uri("/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07/tokens \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "07d52aa8-b96c-4b55-b05d-f5f570e1775a",
    "type": "tokens",
    "attributes": {
      "kind": "product-token",
      "token": "prod-2ddd064509b6bcaa356958dcce6da3a538919e13ddbc26b359fb374ff89dfacav3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "permissions": ["license.create", "machine.create", ...],
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
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07"
        },
        "data": {
          "type": "products",
          "id": "31339351-f7f5-4bdd-8346-5d8399a1ac07"
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
      "kind": "product-token",
      "token": "prod-2ddd064509b6bcaa356958dcce6da3a538919e13ddbc26b359fb374ff89dfacav3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "permissions": ["license.create", "machine.create", ...],
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
          "related": "/v1/accounts/<account>/products/31339351-f7f5-4bdd-8346-5d8399a1ac07"
        },
        "data": {
          "type": "products",
          "id": "31339351-f7f5-4bdd-8346-5d8399a1ac07"
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