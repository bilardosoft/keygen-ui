# [_link_](https://keygen.sh/docs/api/users/\#users) Users

Keygen provides identity management for your customers, which allows you to
authenticate them using an email/password by creating a [token](https://keygen.sh/docs/api/tokens/). The
token can then be used to manage their resources in a client-side environment,
e.g. activating machines, creating licenses, etc. In addition, it offers other
features such as associating multiple licensing with a single user, a simple
password reset flow, etc.

Users don't necessarily need a password. The only required attribute for a user
is an email address. Passwordless users can be useful for associating an email
address to a license, for example, for a license key recovery flow.

**Not a big fan of the whole "license key" system, which requires your users**
**to keep track of and remember long, complicated keys?** Then our user identity
management might be a great fit for you. It allows your users to authenticate
with our API using only an email and password, something they're used to keeping
track of. It can not only improve the overall user experience for your product,
but it may also decrease your support costs (many of which are historically
about forgotten license keys).

#### [_link_](https://keygen.sh/docs/api/users/\#users-toc) Table of contents

01. [The user object](https://keygen.sh/docs/api/users/#users-object)
02. [Create a user](https://keygen.sh/docs/api/users/#users-create)
03. [Retrieve a user](https://keygen.sh/docs/api/users/#users-retrieve)
04. [Update a user](https://keygen.sh/docs/api/users/#users-update)
05. [Delete a user](https://keygen.sh/docs/api/users/#users-delete)
06. [List all users](https://keygen.sh/docs/api/users/#users-list)
07. [Update password](https://keygen.sh/docs/api/users/#users-actions-update-password)
08. [Reset password](https://keygen.sh/docs/api/users/#users-actions-reset-password)
09. [Ban user](https://keygen.sh/docs/api/users/#users-actions-ban)
10. [Unban user](https://keygen.sh/docs/api/users/#users-actions-unban)
11. [User tokens](https://keygen.sh/docs/api/users/#users-tokens)
12. [Change group](https://keygen.sh/docs/api/users/#users-relationships-change-group)
13. [The second factor object](https://keygen.sh/docs/api/users/#second-factors-object)
14. [Add a second factor](https://keygen.sh/docs/api/users/#second-factors-create)
15. [Retrieve a second factor](https://keygen.sh/docs/api/users/#second-factors-retrieve)
16. [Update a second factor](https://keygen.sh/docs/api/users/#second-factors-update)
17. [Delete a second factor](https://keygen.sh/docs/api/users/#second-factors-delete)
18. [List second factors](https://keygen.sh/docs/api/users/#second-factors-list)

## [_link_](https://keygen.sh/docs/api/users/\#users-object) The user object

Below you will find the various attributes for the user resource, as well
as the user resource's relationships. To modify a relationship, you will
need to use the canonical link for the given resource.

### [_link_](https://keygen.sh/docs/api/users/\#users-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-attrs-fullName) data.attributes.fullName

stringread only



The full name of the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-attrs-firstName) data.attributes.firstName

string



The first name of the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-attrs-lastName) data.attributes.lastName

string



The last name of the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-attrs-email) data.attributes.email

string



The unique email of the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-attrs-status) data.attributes.status

stringread only



The user's status, for filtering purposes and to ascertain overall status at-a-glance. An active user is a user that was created within the last 90 days, or has a license that has been created, validated, checked out, or checked in within the last 90 days. An inactive user is a user that has none of those traits. One of: `ACTIVE`, `INACTIVE`, or `BANNED`.



**This is not a replacement for license validation and is not a representation of the user's validity i.r.t. licenses.** This is for status at-a-glance, but does not supplement or replace [license validation](https://keygen.sh/docs/api/users/#licenses-actions-validate). It has no effect on whether or not the user can authenticate or make requests.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-attrs-role) data.attributes.role

string



The role of the user.



For more in-depth information on user roles, and detailed resource permissions for each role, please see [the roles and permissions section](https://keygen.sh/docs/api/authorization/).



###### Options



- `user`: A normal user of one or more of your products. Depending on account settings, they can have permission to manage their own resources, e.g. licenses and machines. They cannot manage other users' resources.
- `support-agent`: An internal administrative user of your Keygen account, with a limited subset of permissions. Support Agents can read most resource data, but cannot create, update or delete resources.
- `sales-agent`: An internal administrative user of your Keygen account, with a limited subset of permissions. Sales Agents can read most resource data, but can only create, update and delete specific resources.
- `developer`: An internal administrative user of your Keygen account, with permission to manage all resources, but they cannot manage account billing.
- `read-only`: An internal administrative user of your Keygen account, with permission to read all resources, except for account billing.
- `admin`: An internal administrative user of your Keygen account, with permission to manage the entire account.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-attrs-permissions) data.attributes.permissions

array<string>



The permissions for the user. Default and available permissions are covered [here](https://keygen.sh/docs/api/authorization/#authorization-permissions).

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-attrs-metadata) data.attributes.metadata

object<string, any>



Object containing user [metadata](https://keygen.sh/docs/api/metadata/).

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-attrs-created) data.attributes.created

timestamp (iso8601)read only



When the user was created.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-attrs-updated) data.attributes.updated

timestamp (iso8601)read only



When the user was last updated.


### [_link_](https://keygen.sh/docs/api/users/\#users-object-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-relationships-account) data.relationships.account

individual



The account that the user belongs to.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-relationships-environment) data.relationships.environment

individual



The environment that the user belongs to.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-relationships-group) data.relationships.group

individualoptional



The group the user belongs to.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-relationships-products) data.relationships.products

collection



The products that the user is associated with.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-relationships-licenses) data.relationships.licenses

collection



The licenses that the user is associated with.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-relationships-machines) data.relationships.machines

collection



The machines that the user is associated with.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-object-relationships-tokens) data.relationships.tokens

collection



The authentication tokens of the user.


#### Example object

```
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/users/\#users-create) Create a user

Creates a new user resource. Users may be created with only an email address — no
name or password is necessarily required. This can act as a way to associate an email
address with a license, which can later be claimed and turned into a full user profile,
if needed, using the password reset flow. This is particularly great for custom license
recovery flows, where you may need to email a user their lost license keys.

**Please note that user resources are shared between products**—meaning, when your account has
multiple products, your users are signing up for a user profile for _all_ of your products, not
just a single product. Your registration verbiage should reflect that. They will be able to
login across all of your products with a single user profile, _but are licensed per-product._

**For example, a user signs up for a "Blizzard" account, not for a "World of Warcraft" account.**
And with their "Blizzard" account, they will be able to login and buy licenses for "World of Warcraft",
"Overwatch", "Starcraft", and for other products which "Blizzard" provides.


### [_link_](https://keygen.sh/docs/api/users/\#users-create-permissions) Required permissions

- user.createOnly required when authenticated

### [_link_](https://keygen.sh/docs/api/users/\#users-create-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#users-create-auths-none) None





When the account is unprotected, no authentication is required and anybody may create a new user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-create-auths-bearer) Bearer

required



When the account is protected, an authentication token with admin privileges or a product token is required.


### [_link_](https://keygen.sh/docs/api/users/\#users-create-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#users-create-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/users/\#users-create-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/users/\#users-create-attrs-firstName) data.attributes.firstName

stringoptional



The first name of the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-create-attrs-lastName) data.attributes.lastName

stringoptional



The last name of the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-create-attrs-email) data.attributes.email

stringrequired



The unique email of the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-create-attrs-password) data.attributes.password

stringoptional



The password for the user. Must be at least 8 characters. May be set to `null` for a passwordless user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-create-attrs-role) data.attributes.role

stringdefault=userprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The role of the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-create-attrs-permissions) data.attributes.permissions

array<string>



The permissions for the user. Default and available permissions are covered [here](https://keygen.sh/docs/api/authorization/#authorization-permissions).

- #### [_link_](https://keygen.sh/docs/api/users/\#users-create-attrs-metadata) data.attributes.metadata

object<string, any>optional



Object containing user [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/users/\#users-create-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/users/\#users-create-relationships-group) data.relationships.group

[linkage<group>](https://keygen.sh/docs/api/relationships/)optionalprotectedProtected relationships are only available for bearers with an admin, environment or product role.



The group the user belongs to.


### [_link_](https://keygen.sh/docs/api/users/\#users-create-returns) Returns

A `201 Created` response will be returned along with the new user object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users
https://api.keygen.sh/v1/accounts/<account>/users
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json"
  },
  body: JSON.stringify({
    "data": {
      "type": "users",
      "attributes": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "jdoe@keygen.sh",
        "password": "secret"
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json"
  },
  body: JSON.stringify({
    "data": {
      "type": "users",
      "attributes": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "jdoe@keygen.sh",
        "password": "secret"
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/users",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json"
  },
  data=json.dumps({
    "data": {
      "type": "users",
      "attributes": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "jdoe@keygen.sh",
        "password": "secret"
      }
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/users",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json"
  },
  data=json.dumps({
    "data": {
      "type": "users",
      "attributes": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "jdoe@keygen.sh",
        "password": "secret"
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json"\
  ],
  parameters: [\
    "data": [\
      "type": "users",\
      "attributes": [\
        "firstName": "John",\
        "lastName": "Doe",\
        "email": "jdoe@keygen.sh",\
        "password": "secret"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json"\
  ],
  parameters: [\
    "data": [\
      "type": "users",\
      "attributes": [\
        "firstName": "John",\
        "lastName": "Doe",\
        "email": "jdoe@keygen.sh",\
        "password": "secret"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("users", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");

request.AddJsonBody(new {
  data = new {
    type = "users",
    attributes = new {
      firstName = "John",
      lastName = "Doe",
      email = "jdoe@keygen.sh",
      password = "secret"
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("users", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");

request.AddJsonBody(new {
  data = new {
    type = "users",
    attributes = new {
      firstName = "John",
      lastName = "Doe",
      email = "jdoe@keygen.sh",
      password = "secret"
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "users",
    "attributes" to mapOf(
      "firstName" to "John",
      "lastName" to "Doe",
      "email" to "jdoe@keygen.sh",
      "password" to "secret"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "users",
    "attributes" to mapOf(
      "firstName" to "John",
      "lastName" to "Doe",
      "email" to "jdoe@keygen.sh",
      "password" to "secret"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users")
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
    entry("type", "users"),
    entry("attributes", ofEntries(
      entry("firstName", "John"),
      entry("lastName", "Doe"),
      entry("email", "jdoe@keygen.sh"),
      entry("password", "secret")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users")
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
    entry("type", "users"),
    entry("attributes", ofEntries(
      entry("firstName", "John"),
      entry("lastName", "Doe"),
      entry("email", "jdoe@keygen.sh"),
      entry("password", "secret")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users")
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
attrs["firstName"] = value::string("John");
attrs["lastName"] = value::string("Doe");
attrs["email"] = value::string("jdoe@keygen.sh");
attrs["password"] = value::string("secret");

value data;
data["type"] = value::string("users");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users");
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
attrs["firstName"] = value::string("John");
attrs["lastName"] = value::string("Doe");
attrs["email"] = value::string("jdoe@keygen.sh");
attrs["password"] = value::string("secret");

value data;
data["type"] = value::string("users");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/users \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -d '{
        "data": {
          "type": "users",
          "attributes": {
            "firstName": "John",
            "lastName": "Doe",
            "email": "jdoe@keygen.sh",
            "password": "secret"
          }
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/users \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -d '{
        "data": {
          "type": "users",
          "attributes": {
            "firstName": "John",
            "lastName": "Doe",
            "email": "jdoe@keygen.sh",
            "password": "secret"
          }
        }
      }'
content_copy
```

#### Example response / 201 Created

```
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/users/\#users-retrieve) Retrieve a user

Retrieves the details of an existing user.

### [_link_](https://keygen.sh/docs/api/users/\#users-retrieve-permissions) Required permissions

- user.read

### [_link_](https://keygen.sh/docs/api/users/\#users-retrieve-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#users-retrieve-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, the user, or a product. In addition, users can read the owner and the other users of their licenses, and licenses can read their owner and users (when permitted).


### [_link_](https://keygen.sh/docs/api/users/\#users-retrieve-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#users-retrieve-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-retrieve-params-id) <id>

stringrequired



The identifier (UUID) or email of the user to be retrieved.


### [_link_](https://keygen.sh/docs/api/users/\#users-retrieve-returns) Returns

A `200 OK` response will be returned along with a user object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<id>
https://api.keygen.sh/v1/accounts/<account>/users/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298", {
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
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
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
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298")
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

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298");
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

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298");
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();

content_copycurl https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
      "permissions": ["license.create", "license.validate", ...],
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
      "permissions": ["license.create", "license.validate", ...],
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/users/\#users-update) Update a user

Updates the specified user resource by setting the values of the parameters
passed. Any parameters not provided will be left unchanged.

### [_link_](https://keygen.sh/docs/api/users/\#users-update-permissions) Required permissions

- user.update

### [_link_](https://keygen.sh/docs/api/users/\#users-update-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, the user, or a product.


### [_link_](https://keygen.sh/docs/api/users/\#users-update-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-params-id) <id>

stringrequired



The identifier (UUID) or email of the user to be updated.


### [_link_](https://keygen.sh/docs/api/users/\#users-update-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-attrs-firstName) data.attributes.firstName

stringoptional



The first name of the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-attrs-lastName) data.attributes.lastName

stringoptional



The last name of the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-attrs-email) data.attributes.email

stringoptional



The unique email of the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-attrs-password) data.attributes.password

stringoptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The password of the user. Must be at least 8 characters. May be set to `null` for a passwordless user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-attrs-role) data.attributes.role

stringoptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The role of the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-attrs-permissions) data.attributes.permissions

array<string>



The permissions for the user. Default and available permissions are covered [here](https://keygen.sh/docs/api/authorization/#authorization-permissions).

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-attrs-metadata) data.attributes.metadata

object<string, any>optionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



Object containing user [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/users/\#users-update-returns) Returns

A `200 OK` response will be returned along with the updated user object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<id>
https://api.keygen.sh/v1/accounts/<account>/users/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "users",
      "attributes": {
        "metadata": {
          "nickname": "Jack"
        }
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "users",
      "attributes": {
        "metadata": {
          "nickname": "Jack"
        }
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "users",
      "attributes": {
        "metadata": {
          "nickname": "Jack"
        }
      }
    }
  })
).json()
import requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "users",
      "attributes": {
        "metadata": {
          "nickname": "Jack"
        }
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "users",\
      "attributes": [\
        "metadata": [\
          "nickname": "Jack"\
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "users",\
      "attributes": [\
        "metadata": [\
          "nickname": "Jack"\
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
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "users",
    attributes = new {
      metadata = new {
        nickname = "Jack"
      }
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "users",
    attributes = new {
      metadata = new {
        nickname = "Jack"
      }
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "users",
    "attributes" to mapOf(
      "metadata" to mapOf(
        "nickname" to "Jack"
      )
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298")
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
    "type" to "users",
    "attributes" to mapOf(
      "metadata" to mapOf(
        "nickname" to "Jack"
      )
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298")
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
    entry("type", "users"),
    entry("attributes", ofEntries(
      entry("metadata", ofEntries(
        entry("nickname", "Jack")
      ))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298")
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
    entry("type", "users"),
    entry("attributes", ofEntries(
      entry("metadata", ofEntries(
        entry("nickname", "Jack")
      ))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298")
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

value metadata;
metadata["nickname"] = value::string("Jack");

value attrs;
attrs["metadata"] = metadata;

value data;
data["type"] = value::string("users");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298");
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

value metadata;
metadata["nickname"] = value::string("Jack");

value attrs;
attrs["metadata"] = metadata;

value data;
data["type"] = value::string("users");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298");
req.set_method(methods::PATCH);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PATCH https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "users",
          "attributes": {
            "metadata": {
              "nickname": "Jack"
            }
          }
        }
      }'
curl -X PATCH https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "users",
          "attributes": {
            "metadata": {
              "nickname": "Jack"
            }
          }
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
      "permissions": ["license.create", "license.validate", ...],
      "metadata": {
        "nickname": "Jack"
      },
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
      "permissions": ["license.create", "license.validate", ...],
      "metadata": {
        "nickname": "Jack"
      },
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/users/\#users-delete) Delete a user

Permanently deletes a user. It cannot be undone. This action also immediately
deletes any licenses and machines that the user is associated with.

### [_link_](https://keygen.sh/docs/api/users/\#users-delete-permissions) Required permissions

- user.delete

### [_link_](https://keygen.sh/docs/api/users/\#users-delete-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#users-delete-auths-bearer) Bearer

required



An authentication token with admin privileges or a product, given the user has a user role, and the user either has no products or their only product is the authenticated product.


### [_link_](https://keygen.sh/docs/api/users/\#users-delete-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#users-delete-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-delete-params-id) <id>

stringrequired



The identifier (UUID) or email of the user to be deleted.


### [_link_](https://keygen.sh/docs/api/users/\#users-delete-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<id>
https://api.keygen.sh/v1/accounts/<account>/users/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
content_copyimport requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
import requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
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
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298")
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

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298");
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

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298");
req.set_method(methods::DELETE);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 204 No Content

```
No content
No content
```

## [_link_](https://keygen.sh/docs/api/users/\#users-list) List all users

Returns a list of users. The users are returned sorted by creation date,
with the most recent users appearing first. Resources are automatically
scoped to the authenticated bearer e.g. when authenticated as a product,
only users associated with the specific product, through a license,
will be listed in the results.

### [_link_](https://keygen.sh/docs/api/users/\#users-list-permissions) Required permissions

- user.read

### [_link_](https://keygen.sh/docs/api/users/\#users-list-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#users-list-auths-bearer) Bearer

required



An authentication token with privileges to view the resources: either an admin or a product. In addition, users can read the owner and the other users of their licenses, and licenses can read their owner and users (when permitted).


### [_link_](https://keygen.sh/docs/api/users/\#users-list-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#users-list-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/users/\#users-list-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#users-list-query-limit) limit

integerdefault=10



A limit on the number of users to be returned. Limit must be a number between 1 and 100.





```
/v1/accounts/<account>/users?limit=25
/v1/accounts/<account>/users?limit=25
```

- #### [_link_](https://keygen.sh/docs/api/users/\#users-list-query-page) page

object<string, integer>



Object containing page `size` and page `number`. Page size must be a number between 1 and 100.





```
/v1/accounts/<account>/users?page[size]=15&page[number]=2
/v1/accounts/<account>/users?page[size]=15&page[number]=2
```

- #### [_link_](https://keygen.sh/docs/api/users/\#users-list-query-status) status

string



The status of the user to filter by. One of: `ACTIVE`, `INACTIVE`, or `BANNED`.



**There are 3 main status codes: `ACTIVE`, `INACTIVE`, and `BANNED`. Active users are those with license activity within the past 90 days, while inactive users have no activity in the past 90 days.**





```
/v1/accounts/<account>/users?status=ACTIVE
/v1/accounts/<account>/users?status=ACTIVE
```

- #### [_link_](https://keygen.sh/docs/api/users/\#users-list-query-assigned) assigned

boolean



Only show users assigned a license. A user is considered assigned if they have at least 1 license associated with their profile.





```
/v1/accounts/<account>/users?assigned=true
/v1/accounts/<account>/users?assigned=true
```

- #### [_link_](https://keygen.sh/docs/api/users/\#users-list-query-product) product

string



The identifier (UUID) of the product to filter by.





```
/v1/accounts/<account>/users?product=c6772cd4-c89c-45fa-ab19-395087d79a2d
/v1/accounts/<account>/users?product=c6772cd4-c89c-45fa-ab19-395087d79a2d
```

- #### [_link_](https://keygen.sh/docs/api/users/\#users-list-query-group) group

string



The identifier (UUID) of the group to filter by.





```
/v1/accounts/<account>/users?group=db7e99e1-dd6d-447b-98e8-ceb354d9d85d
/v1/accounts/<account>/users?group=db7e99e1-dd6d-447b-98e8-ceb354d9d85d
```

- #### [_link_](https://keygen.sh/docs/api/users/\#users-list-query-roles) roles

array<string>default=user



Array containing role names to filter by. By default, all non-admin users will be listed i.e. only users with the `user` role will be displayed. The available user roles can be reviewed [here](https://keygen.sh/docs/api/authorization/).





```
/v1/accounts/<account>/users?roles[]=admin&roles[]=user
/v1/accounts/<account>/users?roles[]=admin&roles[]=user
```

- #### [_link_](https://keygen.sh/docs/api/users/\#users-list-query-metadata) metadata

object<string, any>



The metadata object to filter by.





```
/v1/accounts/<account>/users?metadata[customerId]=cust_af9d94bf5ad4
/v1/accounts/<account>/users?metadata[customerId]=cust_af9d94bf5ad4
```


### [_link_](https://keygen.sh/docs/api/users/\#users-list-returns) Returns

A `200 OK` response will be returned along with a list of user objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users
https://api.keygen.sh/v1/accounts/<account>/users
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users?limit=15", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users?limit=15", {
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
  "https://api.keygen.sh/v1/accounts/<account>/users?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/users?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("users", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("users", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users")
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

uri_builder uri("/users");
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

uri_builder uri("/users");
uri.append_query("limit", 15);

req.set_request_uri(uri.to_uri());
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/users?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/users?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": [\
    {\
      "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",\
      "type": "users",\
      "attributes": {\
        "fullName": "John Doe",\
        "firstName": "John",\
        "lastName": "Doe",\
        "email": "jdoe@keygen.sh",\
        "status": "ACTIVE",\
        "role": "user",\
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
        "group": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"\
          },\
          "data": null\
        },\
        "products": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"\
          }\
        },\
        "licenses": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"\
          }\
        },\
        "machines": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"\
          }\
        },\
        "tokens": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"\
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
      "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",\
      "type": "users",\
      "attributes": {\
        "fullName": "John Doe",\
        "firstName": "John",\
        "lastName": "Doe",\
        "email": "jdoe@keygen.sh",\
        "status": "ACTIVE",\
        "role": "user",\
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
        "group": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"\
          },\
          "data": null\
        },\
        "products": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"\
          }\
        },\
        "licenses": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"\
          }\
        },\
        "machines": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"\
          }\
        },\
        "tokens": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"\
          }\
        }\
      }\
    },\
    …\
  ]
}content_copy
```

## [_link_](https://keygen.sh/docs/api/users/\#users-actions) User actions

Actions for the user resource.

### [_link_](https://keygen.sh/docs/api/users/\#users-actions-update-password) Update password

Action to update the user's password. A user's password can **only** be
updated when authenticated as the given user. To update the user's password
as an admin, use the [update user endpoint](https://keygen.sh/docs/api/users/#users-update).

**Updating a user's password will revoke all of the user's tokens, except**
**the one used to perform the request.** Please keep this in mind.

### [_link_](https://keygen.sh/docs/api/users/\#users-update-password-permissions) Required permissions

- user.password.update

### [_link_](https://keygen.sh/docs/api/users/\#users-update-password-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-password-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: the user.


### [_link_](https://keygen.sh/docs/api/users/\#users-update-password-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-password-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-password-params-id) <id>

stringrequired



The identifier (UUID) or email of the user to be retrieved.


### [_link_](https://keygen.sh/docs/api/users/\#users-update-password-meta) Meta

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-password-meta-oldPassword) meta.oldPassword

stringrequired



The current password for the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-update-password-meta-newPassword) meta.newPassword

stringrequired



The new password for the user. Must be at least 8 characters.


### [_link_](https://keygen.sh/docs/api/users/\#users-update-password-returns) Returns

A `200 OK` response will be returned along with the updated user object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<id>/actions/update-password
https://api.keygen.sh/v1/accounts/<account>/users/<id>/actions/update-password
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "meta": {
      "oldPassword": "password123",
      "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "meta": {
      "oldPassword": "password123",
      "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "meta": {
      "oldPassword": "password123",
      "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "meta": {
      "oldPassword": "password123",
      "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "meta": [\
      "oldPassword": "password123",\
      "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "meta": [\
      "oldPassword": "password123",\
      "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  meta = new {
    oldPassword = "password123",
    newPassword = "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  meta = new {
    oldPassword = "password123",
    newPassword = "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "meta" to mapOf(
    "oldPassword" to "password123",
    "newPassword" to "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "meta" to mapOf(
    "oldPassword" to "password123",
    "newPassword" to "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password")
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
  entry("meta", ofEntries(
    entry("oldPassword", "password123"),
    entry("newPassword", "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ")
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password")
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
  entry("meta", ofEntries(
    entry("oldPassword", "password123"),
    entry("newPassword", "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ")
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password")
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

value meta;
meta["oldPassword"] = value::string("password123");
meta["newPassword"] = value::string("Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ");

value body;
body["meta"] = meta;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password");
req.set_method(methods::POST);
req.set_body(body.serialize());

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
using namespace web::json;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

value meta;
meta["oldPassword"] = value::string("password123");
meta["newPassword"] = value::string("Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ");

value body;
body["meta"] = meta;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "meta": {
          "oldPassword": "password123",
          "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/update-password \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "meta": {
          "oldPassword": "password123",
          "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/users/\#users-actions-reset-password) Reset password

Fulfill a user's password reset request. Password reset tokens expire 24 hours
after [requesting the reset](https://keygen.sh/docs/api/passwords/#passwords-forgot). For an
example of self-hosting your password reset flow, please [see this repo](https://github.com/keygen-sh/example-password-reset-fulfillment).
Alternatively, you can use [our Zapier integration](https://zapier.com/apps/keygen/integrations).

When the account is protected, and the user does not yet have a password set,
they will not be able to set their initial password. Only admins may set the
password for a passwordless user, unless the account is unprotected.

**Resetting a user's password will revoke all of the user's tokens.** Please
keep this in mind. Plan your UX accordingly.

### [_link_](https://keygen.sh/docs/api/users/\#users-reset-password-permissions) Required permissions

- user.password.reset

### [_link_](https://keygen.sh/docs/api/users/\#users-reset-password-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#users-reset-password-auths-none) None





When the account is unprotected, any user may reset their password. When protected, passwordless users cannot set a password.


### [_link_](https://keygen.sh/docs/api/users/\#users-reset-password-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#users-reset-password-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-reset-password-params-id) <id>

stringrequired



The identifier (UUID) or email of the user to be retrieved.


### [_link_](https://keygen.sh/docs/api/users/\#users-reset-password-meta) Meta

- #### [_link_](https://keygen.sh/docs/api/users/\#users-reset-password-meta-passwordResetToken) meta.passwordResetToken

stringrequired



The password reset token emailed to the user.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-reset-password-meta-newPassword) meta.newPassword

stringrequired



The new password for the user. Must be at least 8 characters.


### [_link_](https://keygen.sh/docs/api/users/\#users-reset-password-returns) Returns

A `200 OK` response will be returned along with the updated user object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<id>/actions/reset-password
https://api.keygen.sh/v1/accounts/<account>/users/<id>/actions/reset-password
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json"
  },
  body: JSON.stringify({
    "meta": {
      "passwordResetToken": "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3",
      "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json"
  },
  body: JSON.stringify({
    "meta": {
      "passwordResetToken": "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3",
      "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json"
  },
  data=json.dumps({
    "meta": {
      "passwordResetToken": "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3",
      "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json"
  },
  data=json.dumps({
    "meta": {
      "passwordResetToken": "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3",
      "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json"\
  ],
  parameters: [\
    "meta": [\
      "passwordResetToken": "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3",\
      "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json"\
  ],
  parameters: [\
    "meta": [\
      "passwordResetToken": "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3",\
      "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");

request.AddJsonBody(new {
  meta = new {
    passwordResetToken = "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3",
    newPassword = "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");

request.AddJsonBody(new {
  meta = new {
    passwordResetToken = "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3",
    newPassword = "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "meta" to mapOf(
    "passwordResetToken" to "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3",
    "newPassword" to "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "meta" to mapOf(
    "passwordResetToken" to "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3",
    "newPassword" to "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password")
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
  entry("meta", ofEntries(
    entry("passwordResetToken", "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3"),
    entry("newPassword", "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ")
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password")
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
  entry("meta", ofEntries(
    entry("passwordResetToken", "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3"),
    entry("newPassword", "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ")
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password")
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

value meta;
meta["passwordResetToken"] = value::string("e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3");
meta["newPassword"] = value::string("Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ");

value body;
body["meta"] = meta;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password");
req.set_method(methods::POST);
req.set_body(body.serialize());

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
using namespace web::json;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

value meta;
meta["passwordResetToken"] = value::string("e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3");
meta["newPassword"] = value::string("Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ");

value body;
body["meta"] = meta;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -d '{
        "meta": {
          "passwordResetToken": "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3",
          "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/reset-password \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -d '{
        "meta": {
          "passwordResetToken": "e858ce2936f464a91ad9aab276248b414e62fe50f2781396v3",
          "newPassword": "Ep66YCGTD*kc=4AFotPf;DQ3G+@9eQ"
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/users/\#users-actions-ban) Ban user

Action to ban a user. Banned users cannot authenticate with the API, and all licenses
the user owns will have a `BANNED` status.

**Only users with a `user` role can be banned.** If you need to ban an administrator,
first demote the administrator to a `user` role, then ban the user.

### [_link_](https://keygen.sh/docs/api/users/\#users-ban-permissions) Required permissions

- user.ban

### [_link_](https://keygen.sh/docs/api/users/\#users-ban-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#users-ban-auths-bearer) Bearer

required



An authentication token with admin privileges or a product token is required.


### [_link_](https://keygen.sh/docs/api/users/\#users-ban-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#users-ban-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-ban-params-id) <id>

stringrequired



The identifier (UUID) or email of the user to be retrieved.


### [_link_](https://keygen.sh/docs/api/users/\#users-ban-returns) Returns

A `200 OK` response will be returned along with the banned user object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<id>/actions/ban
https://api.keygen.sh/v1/accounts/<account>/users/<id>/actions/ban
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;
import org.json.*;

import static java.util.Map.ofEntries;
import static java.util.Map.entry;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;
import org.json.*;

import static java.util.Map.ofEntries;
import static java.util.Map.entry;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
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
using namespace web::json;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban");
req.set_method(methods::POST);

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
using namespace web::json;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/ban \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "BANNED",
      "role": "user",
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "BANNED",
      "role": "user",
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/users/\#users-actions-unban) Unban user

Action to unban a user.

### [_link_](https://keygen.sh/docs/api/users/\#users-unban-permissions) Required permissions

- user.unban

### [_link_](https://keygen.sh/docs/api/users/\#users-unban-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#users-unban-auths-bearer) Bearer

required



An authentication token with admin privileges or a product token is required.


### [_link_](https://keygen.sh/docs/api/users/\#users-unban-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#users-unban-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-unban-params-id) <id>

stringrequired



The identifier (UUID) or email of the user to be retrieved.


### [_link_](https://keygen.sh/docs/api/users/\#users-unban-returns) Returns

A `200 OK` response will be returned along with the user object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<id>/actions/ban
https://api.keygen.sh/v1/accounts/<account>/users/<id>/actions/ban
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;
import org.json.*;

import static java.util.Map.ofEntries;
import static java.util.Map.entry;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;
import org.json.*;

import static java.util.Map.ofEntries;
import static java.util.Map.entry;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
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
using namespace web::json;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban");
req.set_method(methods::POST);

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
using namespace web::json;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/actions/unban \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
      "metadata": {},
      "created": "2042-01-02T20:26:53.464Z",
      "updated": "2042-01-02T20:26:53.464Z"
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
      "metadata": {},
      "created": "2042-01-02T20:26:53.464Z",
      "updated": "2042-01-02T20:26:53.464Z"
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/users/\#users-relationships) User relationships

Relationship endpoints for the user resource.

## [_link_](https://keygen.sh/docs/api/users/\#users-tokens) Generate a user token

Generates a new user token resource. User tokens, by default, expire after
2 weeks. Though this can be adjusted via the `expiry` attribute. Typically,
you'd want to generate a token using [the tokens resource](https://keygen.sh/docs/api/tokens/#tokens-generate),
using the user's email and password. But this endpoint can be used by admins
to generate a token on a user's behalf.

This endpoint is particularly useful for generating tokens for a user without
a password, or if you want to manage logins another way, e.g. server-side.

### [_link_](https://keygen.sh/docs/api/users/\#users-tokens-permissions) Required permissions

- user.tokens.generate

### [_link_](https://keygen.sh/docs/api/users/\#users-tokens-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#users-tokens-auths-bearer) Bearer

required



An authentication token with admin privileges, or a product.


### [_link_](https://keygen.sh/docs/api/users/\#users-tokens-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#users-tokens-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-tokens-params-id) <id>

stringrequired



The identifier (UUID) or email of the user to generate a token for.


### [_link_](https://keygen.sh/docs/api/users/\#users-tokens-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/users/\#users-tokens-attrs-name) data.attributes.name

stringoptional



An optional name for the token. This can be used to easily identify tokens at a glance.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-tokens-attrs-expiry) data.attributes.expiry

timestamp (iso8601)optional



The timestamp for when the token expires. Requests using an expired token will be rejected.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-tokens-attrs-permissions) data.attributes.permissions

array<string>default=\["\*"\]



The permissions for the token. Available permissions, dependent on the bearer, are covered [here](https://keygen.sh/docs/api/authorization/#authorization-permissions). By default, it is set to a wildcard `*`, which inherits all permissions from the token bearer.


### [_link_](https://keygen.sh/docs/api/users/\#users-tokens-returns) Returns

A `200 OK` response will be returned along with the new token object.
The `token` attribute of the token object, which is used for [authentication](https://keygen.sh/docs/api/authentication/),
is **ONLY** readable directly after creation. Please securely store this
value for later use, otherwise the token may need to be regenerated.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<id>/tokens
https://api.keygen.sh/v1/accounts/<account>/users/<id>/tokens
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens", {
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
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens",
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
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens")
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

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens");
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

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens \
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
      "kind": "user-token",
      "token": "user-f4869386e3b6b39d1f42949131f97a39b42f9a74c553ba7244bbed9d1f79f106v3",
      "expiry": "2022-03-15T19:27:50.440Z",
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
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        },
        "data": {
          "type": "users",
          "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"
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
      "kind": "user-token",
      "token": "user-f4869386e3b6b39d1f42949131f97a39b42f9a74c553ba7244bbed9d1f79f106v3",
      "expiry": "2022-03-15T19:27:50.440Z",
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
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        },
        "data": {
          "type": "users",
          "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/users/\#users-relationships-change-group) Change group

Change a user's group relationship. This will immediately transfer the user
resource to the new group. Changing the user's group will not retroactively
change the group of its licenses or of its machines.

### [_link_](https://keygen.sh/docs/api/users/\#users-change-group-permissions) Required permissions

- user.group.update

### [_link_](https://keygen.sh/docs/api/users/\#users-change-group-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#users-change-group-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, or a product.


### [_link_](https://keygen.sh/docs/api/users/\#users-change-group-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#users-change-group-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#users-change-group-params-id) <id>

stringrequired



The identifier (UUID) or email of the user to be updated.


### [_link_](https://keygen.sh/docs/api/users/\#users-change-group-returns) Returns

A `200 OK` response will be returned along with the updated user object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<id>/group
https://api.keygen.sh/v1/accounts/<account>/users/<id>/group
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group", {
  method: "PUT",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "groups",
      "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group", {
  method: "PUT",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "groups",
      "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.put(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "groups",
      "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  })
).json()
import requests
import json

res = requests.put(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "groups",
      "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group",
  method: .put,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "groups",\
      "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group",
  method: .put,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "groups",\
      "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group",
  Method.PUT
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "groups",
    id = "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group",
  Method.PUT
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "groups",
    id = "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "groups",
    "id" to "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
  )
))

val res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group")
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
    "type" to "groups",
    "id" to "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
  )
))

val res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group")
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
    entry("type", "groups"),
    entry("id", "db7e99e1-dd6d-447b-98e8-ceb354d9d85d")
  ))
));

HttpResponse<JsonNode> res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group")
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
    entry("type", "groups"),
    entry("id", "db7e99e1-dd6d-447b-98e8-ceb354d9d85d")
  ))
));

HttpResponse<JsonNode> res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group")
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

value data;
data["type"] = value::string("groups");
data["id"] = value::string("db7e99e1-dd6d-447b-98e8-ceb354d9d85d");

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group");
req.set_method(methods::PUT);
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

value data;
data["type"] = value::string("groups");
data["id"] = value::string("db7e99e1-dd6d-447b-98e8-ceb354d9d85d");

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group");
req.set_method(methods::PUT);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PUT https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "groups",
          "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
        }
      }'
curl -X PUT https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "groups",
          "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
      "permissions": ["license.create", "license.validate", ...],
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298",
    "type": "users",
    "attributes": {
      "fullName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jdoe@keygen.sh",
      "status": "ACTIVE",
      "role": "user",
      "permissions": ["license.create", "license.validate", ...],
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
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/group"
        },
        "data": null
      },
      "products": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/products"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/machines"
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/tokens"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/users/\#second-factors) Second factors

Second factor endpoints for the user resource.

## [_link_](https://keygen.sh/docs/api/users/\#second-factors-object) The second factor object

Below you will find the various attributes for the second factor resource,
as well as the resource's relationships.

**Once a second factor has been added and enabled, it CANNOT be removed**
**without having access to the second factor secret, even by an admin.**
Please keep this in mind during implementation. We will be introducing
recovery codes soon.

Until recovery codes are implemented, we advise you to backup your
second factor secret. We WILL NOT disable 2FA if you become locked
out due to a lost second factor.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-object-attrs-uri) data.attributes.uri

stringread only



The provisioning URI of the second factor. This can be encoded into a QR code to be scanned by an Authenticator app, such as Authy.



**This value is only displayed when the second factor IS NOT enabled.** Once the second factor has been enabled, this value WILL NOT be displayed.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-object-attrs-secret) data.attributes.secret

stringread only



The secret of the second factor. This can be manually entered into an Authenticator app, such as Authy. We recommend you backup this secret.



**This value is only displayed when the second factor IS NOT enabled.** Once the second factor has been enabled, this value WILL NOT be displayed.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-object-attrs-enabled) data.attributes.enabled

booleandefault=false



Whether or not the second factor is enabled.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-object-attrs-created) data.attributes.created

timestamp (iso8601)read only



When the second factor was created.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-object-attrs-updated) data.attributes.updated

timestamp (iso8601)read only



When the second factor was last updated.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-object-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-object-relationships-account) data.relationships.account

individual



The account that the second factor belongs to.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-object-relationships-user) data.relationships.user

individual



The user the second factor belongs to.


#### Example object

```
{
  "data": {
    "id": "06140047-03ad-4ac4-9db1-ac65db58d6fd",
    "type": "second-factors",
    "attributes":{
      "uri": "otpauth://totp/Keygen:keygen.example?secret=WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7&issuer=Keygen",
      "secret": "WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7",
      "enabled": false,
      "created": "2023-08-02T15:16:13.850Z",
      "updated": "2023-08-02T15:16:13.850Z"
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
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        },
        "data": {
          "type": "users",
          "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        }
      }
    }
  }
}
{
  "data": {
    "id": "06140047-03ad-4ac4-9db1-ac65db58d6fd",
    "type": "second-factors",
    "attributes":{
      "uri": "otpauth://totp/Keygen:keygen.example?secret=WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7&issuer=Keygen",
      "secret": "WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7",
      "enabled": false,
      "created": "2023-08-02T15:16:13.850Z",
      "updated": "2023-08-02T15:16:13.850Z"
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
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        },
        "data": {
          "type": "users",
          "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        }
      }
    }
  }
}
content_copy
```

## [_link_](https://keygen.sh/docs/api/users/\#second-factors-create) Add a second factor

Adds a new second factor for the user. After adding the second factor,
it must be enabled via [an update](https://keygen.sh/docs/api/users/#second-factors-update). To enable
the second factor, a valid OTP must be provided.

**Currently, you can only add one second factor per-user.** But we'll
be lifting this limitation in the future, supporting multiple second
factors per-user.

### [_link_](https://keygen.sh/docs/api/users/\#second-factors-create-permissions) Required permissions

- user.second-factors.create

### [_link_](https://keygen.sh/docs/api/users/\#second-factors-create-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-create-auths-bearer) Bearer

required



An authentication token belonging to an admin, or the particular user that the second factor is for.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-create-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-create-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-create-params-user) <user>

stringrequired



The identifier (UUID) or email of the user the second factor is for.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-create-meta) Meta

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-create-meta-password) meta.password

stringoptional



When the user does not have an existing second factor, the password of the user.

When the user DOES NOT have a second factor, this is required.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-create-meta-otp) meta.otp

stringoptional



When the user has an existing second factor, the OTP code of the second factor.

When the user DOES have a second factor, this is required.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-create-returns) Returns

A `201 Created` response will be returned along with the new second factor object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<user>/second-factors
https://api.keygen.sh/v1/accounts/<account>/users/<user>/second-factors
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: {
    meta: {
      password: "<password>"
    }
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: {
    meta: {
      password: "<password>"
    }
  }
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "meta": {
      "password": "<password>"
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "meta": {
      "password": "<password>"
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors",
  method: .post,
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "meta": [\
      "password": "<password>"\
    ]\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors",
  method: .post,
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "meta": [\
      "password": "<password>"\
    ]\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  meta = new {
    password = "<password>"
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  meta = new {
    password = "<password>"
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "meta" to mapOf(
    "password" to "<password>"
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "meta" to mapOf(
    "password" to "<password>"
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors")
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
  entry("meta", ofEntries(
    entry("password", "<password>")
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors")
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
  entry("meta", ofEntries(
    entry("password", "<password>")
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors")
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

value meta;
meta["password"] = value::string("<password>");

value body;
body["meta"] = meta;

req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors");
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

value meta;
meta["password"] = value::string("<password>");

value body;
body["meta"] = meta;

req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -d '{
        "meta": {
          "password": "<password>"
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -d '{
        "meta": {
          "password": "<password>"
        }
      }'
content_copy
```

#### Example response / 201 Created

```
{
  "data": {
    "id": "06140047-03ad-4ac4-9db1-ac65db58d6fd",
    "type": "second-factors",
    "attributes":{
      "uri": "otpauth://totp/Keygen:keygen.example?secret=WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7&issuer=Keygen",
      "secret": "WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7",
      "enabled": false,
      "created": "2023-08-02T15:16:13.850Z",
      "updated": "2023-08-02T15:16:13.850Z"
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
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        },
        "data": {
          "type": "users",
          "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        }
      }
    }
  }
}
{
  "data": {
    "id": "06140047-03ad-4ac4-9db1-ac65db58d6fd",
    "type": "second-factors",
    "attributes":{
      "uri": "otpauth://totp/Keygen:keygen.example?secret=WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7&issuer=Keygen",
      "secret": "WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7",
      "enabled": false,
      "created": "2023-08-02T15:16:13.850Z",
      "updated": "2023-08-02T15:16:13.850Z"
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
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        },
        "data": {
          "type": "users",
          "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        }
      }
    }
  }
}
content_copy
```

## [_link_](https://keygen.sh/docs/api/users/\#second-factors-retrieve) Retrieve a second factor

Retrieves the details of an existing second factor.

### [_link_](https://keygen.sh/docs/api/users/\#second-factors-retrieve-permissions) Required permissions

- user.second-factors.read

### [_link_](https://keygen.sh/docs/api/users/\#second-factors-retrieve-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-retrieve-auths-bearer) Bearer

required



An authentication token belonging to an admin, or the particular user that the second factor is for.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-retrieve-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-retrieve-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-retrieve-params-user) <user>

stringrequired



The identifier (UUID) or email of a user the second factor belongs to.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-retrieve-params-id) <id>

stringrequired



The identifier (UUID) of the second factor.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-retrieve-returns) Returns

A `200 OK` response will be returned along with the second factor object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<users>/second-factors/<id>
https://api.keygen.sh/v1/accounts/<account>/users/<users>/second-factors/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
content_copyimport requests

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
import requests

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  method: .get,
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let status = response.response?.statusCode
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  method: .get,
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
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd")
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

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd");
req.set_method(methods::GET);

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

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd");
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X GET https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X GET https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "06140047-03ad-4ac4-9db1-ac65db58d6fd",
    "type": "second-factors",
    "attributes":{
      "uri": "otpauth://totp/Keygen:keygen.example?secret=WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7&issuer=Keygen",
      "secret": "WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7",
      "enabled": false,
      "created": "2023-08-02T15:16:13.850Z",
      "updated": "2023-08-02T15:16:13.850Z"
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
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        },
        "data": {
          "type": "users",
          "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        }
      }
    }
  }
}
{
  "data": {
    "id": "06140047-03ad-4ac4-9db1-ac65db58d6fd",
    "type": "second-factors",
    "attributes":{
      "uri": "otpauth://totp/Keygen:keygen.example?secret=WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7&issuer=Keygen",
      "secret": "WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7",
      "enabled": false,
      "created": "2023-08-02T15:16:13.850Z",
      "updated": "2023-08-02T15:16:13.850Z"
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
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        },
        "data": {
          "type": "users",
          "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        }
      }
    }
  }
}
content_copy
```

## [_link_](https://keygen.sh/docs/api/users/\#second-factors-update) Update a second factor

Update an existing second factor for the user. This can be used to enable
and disable a second factor as-needed.

**After adding a second factor, it must then be enabled.** To enable a second
factor, a valid OTP generated by the second factor's secret **MUST** be
provided during update.

### [_link_](https://keygen.sh/docs/api/users/\#second-factors-update-permissions) Required permissions

- user.second-factors.update

### [_link_](https://keygen.sh/docs/api/users/\#second-factors-update-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-update-auths-bearer) Bearer

required



An authentication token belonging to an admin, or the particular user that the second factor is for.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-update-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-update-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-update-params-user) <user>

stringrequired



The identifier (UUID) or email of a user the second factor belongs to.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-update-params-id) <id>

stringrequired



The identifier (UUID) of the second factor.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-update-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-update-attrs-enabled) data.attributes.enabled

booleanoptional



Whether or not the second factor is enabled.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-update-meta) Meta

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-update-meta-otp) meta.otp

stringrequired



The OTP code of the second factor, generated by an Authenticator app via the second factor's secret.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-update-returns) Returns

A `200 OK` response will be returned along with the updated second factor object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<user>/second-factors/<id>
https://api.keygen.sh/v1/accounts/<account>/users/<user>/second-factors/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd", {
  method: "PATCH",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: {
    data: {
      type: "second-factors",
      attributes: {
        enabled: true
      }
    },
    meta: {
      otp: "000000"
    }
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd", {
  method: "PATCH",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: {
    data: {
      type: "second-factors",
      attributes: {
        enabled: true
      }
    },
    meta: {
      otp: "000000"
    }
  }
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "second-factors",
      "attributes": {
        "enabled": true
      }
    },
    "meta": {
      "otp": "000000"
    }
  })
).json()
import requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "second-factors",
      "attributes": {
        "enabled": true
      }
    },
    "meta": {
      "otp": "000000"
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  method: .patch,
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "second-factors",\
      "attributes": [\
        "enabled": true\
      ]\
    ],\
    "meta": [\
      "otp": "000000"\
    ]\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  method: .patch,
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "second-factors",\
      "attributes": [\
        "enabled": true\
      ]\
    ],\
    "meta": [\
      "otp": "000000"\
    ]\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  Method.PATCH
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "second-factors",
    attributes = new {
      enabled = true
    }
  },
  meta = new {
    otp = "000000"
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  Method.PATCH
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "second-factors",
    attributes = new {
      enabled = true
    }
  },
  meta = new {
    otp = "000000"
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "second-factors",
    "attributes" to mapOf(
      "enabled" to true
    )
  ),
  "meta" to mapOf(
    "otp" to "000000"
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "second-factors",
    "attributes" to mapOf(
      "enabled" to true
    )
  ),
  "meta" to mapOf(
    "otp" to "000000"
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd")
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
    entry("type", "second-factors"),
    entry("attributes", ofEntries(
      entry("enabled", true)
    ))
  )),
  entry("meta", ofEntries(
    entry("otp", "000000")
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd")
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
    entry("type", "second-factors"),
    entry("attributes", ofEntries(
      entry("enabled", true)
    ))
  )),
  entry("meta", ofEntries(
    entry("otp", "000000")
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd")
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
attrs["enabled"] = value::boolean(true);

value data;
data["type"] = value::string("second-factors");
data["attributes"] = attrs;

value meta;
meta["otp"] = value::string("000000");

value body;
body["data"] = data;
body["meta"] = meta;

req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd");
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
attrs["enabled"] = value::boolean(true);

value data;
data["type"] = value::string("second-factors");
data["attributes"] = attrs;

value meta;
meta["otp"] = value::string("000000");

value body;
body["data"] = data;
body["meta"] = meta;

req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd");
req.set_method(methods::PATCH);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PATCH https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -d '{
        "data": {
          "type": "second-factors",
          "attributes": {
            "enabled": true
          }
        }
        "meta": {
          "otp": "000000"
        }
      }'
curl -X PATCH https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -d '{
        "data": {
          "type": "second-factors",
          "attributes": {
            "enabled": true
          }
        }
        "meta": {
          "otp": "000000"
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "06140047-03ad-4ac4-9db1-ac65db58d6fd",
    "type": "second-factors",
    "attributes":{
      "uri": "otpauth://totp/Keygen:keygen.example?secret=WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7&issuer=Keygen",
      "secret": "WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7",
      "enabled": true,
      "created": "2023-08-02T15:16:13.850Z",
      "updated": "2023-08-02T15:16:13.850Z"
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
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        },
        "data": {
          "type": "users",
          "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        }
      }
    }
  }
}
{
  "data": {
    "id": "06140047-03ad-4ac4-9db1-ac65db58d6fd",
    "type": "second-factors",
    "attributes":{
      "uri": "otpauth://totp/Keygen:keygen.example?secret=WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7&issuer=Keygen",
      "secret": "WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7",
      "enabled": true,
      "created": "2023-08-02T15:16:13.850Z",
      "updated": "2023-08-02T15:16:13.850Z"
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
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        },
        "data": {
          "type": "users",
          "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        }
      }
    }
  }
}
content_copy
```

## [_link_](https://keygen.sh/docs/api/users/\#second-factors-delete) Delete a second factor

Permanently deletes a second factor. It cannot be undone.

### [_link_](https://keygen.sh/docs/api/users/\#second-factors-delete-permissions) Required permissions

- user.second-factors.delete

### [_link_](https://keygen.sh/docs/api/users/\#second-factors-delete-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-delete-auths-bearer) Bearer

required



An authentication token belonging to an admin, or the particular user that the second factor is for.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-delete-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-delete-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-delete-params-user) <user>

stringrequired



The identifier (UUID) or email of a user the second factor belongs to.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-delete-params-id) <id>

stringrequired



The identifier (UUID) of the second factor.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-delete-meta) Meta

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-delete-meta-otp) meta.otp

stringoptional



The OTP code of the second factor, generated by an Authenticator app via the second factor's secret.

When the second factor is enabled, this is required.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-delete-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<users>/second-factors/<id>
https://api.keygen.sh/v1/accounts/<account>/users/<users>/second-factors/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
content_copyimport requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
import requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
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
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd")
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

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd");
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

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd");
req.set_method(methods::DELETE);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors/06140047-03ad-4ac4-9db1-ac65db58d6fd \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 204 No Content

```
No content
No content
```

## [_link_](https://keygen.sh/docs/api/users/\#second-factors-list) List second factors

Returns a list of second factors. The second factors are returned sorted
by creation date, with the most recent second factors appearing first.

### [_link_](https://keygen.sh/docs/api/users/\#second-factors-list-permissions) Required permissions

- user.second-factors.read

### [_link_](https://keygen.sh/docs/api/users/\#second-factors-list-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-list-auths-bearer) Bearer

required



An authentication token belonging to an admin, or the particular user that the second factors are for.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-list-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-list-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/users/\#second-factors-list-params-user) <user>

stringrequired



The identifier (UUID) or email of a user the second factors are for.


### [_link_](https://keygen.sh/docs/api/users/\#second-factors-list-returns) Returns

A `200 OK` response will be returned along with a list of second factor objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/users/<users>/second-factors
https://api.keygen.sh/v1/accounts/<account>/users/<users>/second-factors
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
content_copyimport requests

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
import requests

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors",
  method: .get,
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let status = response.response?.statusCode
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors",
  method: .get,
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
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors")
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

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors");
req.set_method(methods::GET);

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

req.set_request_uri("/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors");
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X GET https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X GET https://api.keygen.sh/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298/second-factors \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": [\
    {\
      "id": "06140047-03ad-4ac4-9db1-ac65db58d6fd",\
      "type": "second-factors",\
      "attributes":{\
        "uri": "otpauth://totp/Keygen:keygen.example?secret=WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7&issuer=Keygen",\
        "secret": "WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7",\
        "enabled": false,\
        "created": "2023-08-02T15:16:13.850Z",\
        "updated": "2023-08-02T15:16:13.850Z"\
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
        "owner": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298"\
          },\
          "data": {\
            "type": "users",\
            "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"\
          }\
        }\
      }\
    },\
    ...\
  ]
}
{
  "data": [\
    {\
      "id": "06140047-03ad-4ac4-9db1-ac65db58d6fd",\
      "type": "second-factors",\
      "attributes":{\
        "uri": "otpauth://totp/Keygen:keygen.example?secret=WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7&issuer=Keygen",\
        "secret": "WHIU2FPR7KKTCAWSDPLKA2O7TGL5IRI7",\
        "enabled": false,\
        "created": "2023-08-02T15:16:13.850Z",\
        "updated": "2023-08-02T15:16:13.850Z"\
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
        "owner": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/a5a154d2-f026-40fa-bc8d-a7e3ca415298"\
          },\
          "data": {\
            "type": "users",\
            "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"\
          }\
        }\
      }\
    },\
    ...\
  ]
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