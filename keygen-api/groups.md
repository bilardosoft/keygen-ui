# [_link_](https://keygen.sh/docs/api/groups/\#groups) Groups

Groups can be used to associate multiple users, licenses and machines under a
single group. This is great for setting up "Teams" or group licenses. For example,
you use an "ACME Co." group for a team license package that belongs to the ACME
customer, making sure all licenses are associated with each other.

How resources can be added into a group:

1. By specifying a `group` relationship during creation of a new resource. For example,
to add a new license to a group, [specify the `group` relationship](https://keygen.sh/docs/api/licenses/#licenses-create-relationships-group).
2. By changing an existing resource's group relationship. For example, to add an existing
license to a group, [change its group relationship](https://keygen.sh/docs/api/licenses/#licenses-relationships-change-group).
3. Through inheritance. For example, any machines created for a license in group "ACME"
will automatically be included into the same group.

**Groups can also be used to assert collective resource limits for certain customers.**
For example, providing a handful of licenses to a customer which should not exceed a
_combined_ machine count across all of the customer's licenses.


As a more concrete example — consider a licensing model which wanted to assert each
individual license can have up to 3 activations, but collectively, the entire group
should not exceed a total of 15 activations. You would add each license to the group,
then set a machine limit on the group, which will be applied in addition to the
policy's per-license machine limit.


#### [_link_](https://keygen.sh/docs/api/groups/\#groups-toc) Table of contents

1. [The group object](https://keygen.sh/docs/api/groups/#groups-object)
2. [Create an group](https://keygen.sh/docs/api/groups/#groups-create)
3. [Retrieve an group](https://keygen.sh/docs/api/groups/#groups-retrieve)
4. [Update an group](https://keygen.sh/docs/api/groups/#groups-update)
5. [Delete an group](https://keygen.sh/docs/api/groups/#groups-delete)
6. [List groups](https://keygen.sh/docs/api/groups/#groups-list)

## [_link_](https://keygen.sh/docs/api/groups/\#groups-object) The group object

Below you will find the various attributes for the group resource. Groups can be
utilized to associate multiple resources with each other, as well as to define
collective resource limits.

### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs-name) data.attributes.name

string



The name of the group.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs-maxUsers) data.attributes.maxUsers

integer



The maximum number of users the group can have, collectively. When `null`, an unlimited number of users may be in the group. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs-maxLicenses) data.attributes.maxLicenses

integer



The maximum number of licenses the group can have, collectively. When `null`, an unlimited number of licenses may be in the group. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs-maxMachines) data.attributes.maxMachines

integer



The maximum number of machines the group can have, collectively. When `null`, an unlimited number of machines may be in the group. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs-created) data.attributes.created

timestamp (iso8601)read only



When the group was created.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs-updated) data.attributes.updated

timestamp (iso8601)read only



When the group was last updated.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs-metadata) data.attributes.metadata

object<string, any>



Object containing group [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-relationships-account) data.relationships.account

individual



The account that the group belongs to.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-relationships-environment) data.relationships.environment

individual



The environment that the group belongs to.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-relationships-owners) data.relationships.owners

collectionprotectedProtected relationships are only available for bearers with an admin, environment or product role.



The owners of the group.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-relationships-users) data.relationships.users

collectionprotectedProtected relationships are only available for bearers with an admin, environment or product role.



The users that are in the group.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-relationships-licenses) data.relationships.licenses

collectionprotectedProtected relationships are only available for bearers with an admin, environment or product role.



The licenses that are in the group.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-relationships-machines) data.relationships.machines

collectionprotectedProtected relationships are only available for bearers with an admin, environment or product role.



The machines that are in the group.


#### Example object

```
{
  "data": {
    "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
    "type": "groups",
    "attributes": {
      "name": "Example Group",
      "maxUsers": null,
      "maxLicenses": null,
      "maxMachines": null,
      "metadata": {},
      "created": "2022-03-07T14:13:02.959Z",
      "updated": "2022-03-07T14:13:02.959Z"
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
      "owners": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/owners"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/users"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/machines"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  }
}
{
  "data": {
    "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
    "type": "groups",
    "attributes": {
      "name": "Example Group",
      "maxUsers": null,
      "maxLicenses": null,
      "maxMachines": null,
      "metadata": {},
      "created": "2022-03-07T14:13:02.959Z",
      "updated": "2022-03-07T14:13:02.959Z"
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
      "owners": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/owners"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/users"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/machines"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/groups/\#groups-create) Create a group

Creates a new group resource.

### [_link_](https://keygen.sh/docs/api/groups/\#groups-create-permissions) Required permissions

- group.create

### [_link_](https://keygen.sh/docs/api/groups/\#groups-create-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-create-auths-bearer) Bearer

required



An authentication token with privileges to create the resource: an admin or a product.


### [_link_](https://keygen.sh/docs/api/groups/\#groups-create-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-create-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs-name) data.attributes.name

stringrequired



The name of the group.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs-maxUsers) data.attributes.maxUsers

integeroptional



The maximum number of users the group can have, collectively. When `null`, an unlimited number of users may be in the group. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs-maxLicenses) data.attributes.maxLicenses

integeroptional



The maximum number of licenses the group can have, collectively. When `null`, an unlimited number of licenses may be in the group. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs-maxMachines) data.attributes.maxMachines

integeroptional



The maximum number of machines the group can have, collectively. When `null`, an unlimited number of machines may be in the group. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-object-attrs-metadata) data.attributes.metadata

object<string, any>optional



Object containing group [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/groups/\#groups-create-returns) Returns

A `201 Created` response will be returned along with the new group object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/groups
https://api.keygen.sh/v1/accounts/<account>/groups
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/groups", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "groups",
      "attributes": {
        "name": "Example Group"
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/groups", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "groups",
      "attributes": {
        "name": "Example Group"
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/groups",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "groups",
      "attributes": {
        "name": "Example Group"
      }
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/groups",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "groups",
      "attributes": {
        "name": "Example Group"
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/groups",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "groups",\
      "attributes": [\
        "name": "Example Group"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/groups",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "groups",\
      "attributes": [\
        "name": "Example Group"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("groups", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "groups",
    attributes = new {
      name = "Example Group"
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("groups", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "groups",
    attributes = new {
      name = "Example Group"
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "groups",
    "attributes" to mapOf(
      "name" to "Example Group"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/groups")
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
    "attributes" to mapOf(
      "name" to "Example Group"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/groups")
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
    entry("attributes", ofEntries(
      entry("name", "Example Group")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/groups")
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
    entry("attributes", ofEntries(
      entry("name", "Example Group")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/groups")
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
attrs["name"] = value::string("Example Group");

value data;
data["type"] = value::string("groups");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/groups");
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
attrs["name"] = value::string("Example Group");

value data;
data["type"] = value::string("groups");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/groups");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/groups \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "groups",
          "attributes": {
            "name": "Example Feature"
          }
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/groups \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "groups",
          "attributes": {
            "name": "Example Feature"
          }
        }
      }'
content_copy
```

#### Example response / 201 Created

```
{
  "data": {
    "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
    "type": "groups",
    "attributes": {
      "name": "Example Group",
      "maxUsers": null,
      "maxLicenses": null,
      "maxMachines": null,
      "metadata": {},
      "created": "2022-03-07T14:13:02.959Z",
      "updated": "2022-03-07T14:13:02.959Z"
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
      "owners": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/owners"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/users"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/machines"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  }
}
{
  "data": {
    "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
    "type": "groups",
    "attributes": {
      "name": "Example Group",
      "maxUsers": null,
      "maxLicenses": null,
      "maxMachines": null,
      "metadata": {},
      "created": "2022-03-07T14:13:02.959Z",
      "updated": "2022-03-07T14:13:02.959Z"
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
      "owners": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/owners"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/users"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/machines"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/groups/\#groups-retrieve) Retrieve a group

Retrieves the details of an existing group.

### [_link_](https://keygen.sh/docs/api/groups/\#groups-retrieve-permissions) Required permissions

- group.read

### [_link_](https://keygen.sh/docs/api/groups/\#groups-retrieve-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-retrieve-auths-bearer) Bearer

required



An authentication token with privileges to view the resources: either an admin, a product, a group owner, or a group member.


### [_link_](https://keygen.sh/docs/api/groups/\#groups-retrieve-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-retrieve-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-retrieve-params-id) <id>

stringrequired



The identifier (UUID) of the group to be retrieved.


### [_link_](https://keygen.sh/docs/api/groups/\#groups-retrieve-returns) Returns

A `200 OK` response will be returned along with a group object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/groups/<id>
https://api.keygen.sh/v1/accounts/<account>/groups/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d", {
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
  "https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
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
  "groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d")
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

req.set_request_uri("/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d");
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

req.set_request_uri("/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d");
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
    "type": "groups",
    "attributes": {
      "name": "Example Group",
      "maxUsers": null,
      "maxLicenses": null,
      "maxMachines": null,
      "metadata": {},
      "created": "2022-03-07T14:13:02.959Z",
      "updated": "2022-03-07T14:13:02.959Z"
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
      "owners": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/owners"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/users"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/machines"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  }
}
{
  "data": {
    "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
    "type": "groups",
    "attributes": {
      "name": "Example Group",
      "maxUsers": null,
      "maxLicenses": null,
      "maxMachines": null,
      "metadata": {},
      "created": "2022-03-07T14:13:02.959Z",
      "updated": "2022-03-07T14:13:02.959Z"
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
      "owners": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/owners"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/users"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/licenses"
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/machines"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/groups/\#groups-update) Update a group

Updates the specified group resource by setting the values of the parameters
passed. Any parameters not provided will be left unchanged.

### [_link_](https://keygen.sh/docs/api/groups/\#groups-update-permissions) Required permissions

- group.update

### [_link_](https://keygen.sh/docs/api/groups/\#groups-update-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-update-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: an admin.


### [_link_](https://keygen.sh/docs/api/groups/\#groups-update-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-update-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-update-params-id) <id>

stringrequired



The identifier (UUID) of the group to be updated.


### [_link_](https://keygen.sh/docs/api/groups/\#groups-update-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-update-attrs-name) data.attributes.name

stringoptional



The name of the group.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-update-attrs-maxUsers) data.attributes.maxUsers

integeroptional



The maximum number of users the group can have, collectively. When `null`, an unlimited number of users may be in the group. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-update-attrs-maxLicenses) data.attributes.maxLicenses

integeroptional



The maximum number of licenses the group can have, collectively. When `null`, an unlimited number of licenses may be in the group. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-update-attrs-maxMachines) data.attributes.maxMachines

integeroptional



The maximum number of machines the group can have, collectively. When `null`, an unlimited number of machines may be in the group. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-update-attrs-metadata) data.attributes.metadata

object<string, any>optional



Object containing group [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/groups/\#groups-update-returns) Returns

A `200 OK` response will be returned along with the updated group object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/groups/<id>
https://api.keygen.sh/v1/accounts/<account>/groups/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "groups",
      "attributes": {
        "code": "EXAMPLE_ENTITLEMENT_CODE"
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "groups",
      "attributes": {
        "code": "EXAMPLE_ENTITLEMENT_CODE"
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "groups",
      "attributes": {
        "code": "EXAMPLE_ENTITLEMENT_CODE"
      }
    }
  })
).json()
import requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "groups",
      "attributes": {
        "code": "EXAMPLE_ENTITLEMENT_CODE"
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "groups",\
      "attributes": [\
        "code": "EXAMPLE_ENTITLEMENT_CODE"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "groups",\
      "attributes": [\
        "code": "EXAMPLE_ENTITLEMENT_CODE"\
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
  "groups/db1ff21b-f42f-4623-952b-ca7f2600bded",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "groups",
    attributes = new {
      code = "EXAMPLE_ENTITLEMENT_CODE"
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "groups/db1ff21b-f42f-4623-952b-ca7f2600bded",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "groups",
    attributes = new {
      code = "EXAMPLE_ENTITLEMENT_CODE"
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "groups",
    "attributes" to mapOf(
      "code" to "EXAMPLE_ENTITLEMENT_CODE"
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded")
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
    "attributes" to mapOf(
      "code" to "EXAMPLE_ENTITLEMENT_CODE"
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded")
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
    entry("attributes", ofEntries(
      entry("code", "EXAMPLE_ENTITLEMENT_CODE")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded")
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
    entry("attributes", ofEntries(
      entry("code", "EXAMPLE_ENTITLEMENT_CODE")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded")
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
attrs["code"] = value::string("EXAMPLE_ENTITLEMENT_CODE");

value data;
data["type"] = value::string("groups");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/groups/db1ff21b-f42f-4623-952b-ca7f2600bded");
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
attrs["code"] = value::string("EXAMPLE_ENTITLEMENT_CODE");

value data;
data["type"] = value::string("groups");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/groups/db1ff21b-f42f-4623-952b-ca7f2600bded");
req.set_method(methods::PATCH);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PATCH https://api.keygen.sh/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "groups",
          "attributes": {
            "code": "EXAMPLE_ENTITLEMENT_CODE"
          }
        }
      }'
curl -X PATCH https://api.keygen.sh/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "groups",
          "attributes": {
            "code": "EXAMPLE_ENTITLEMENT_CODE"
          }
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "db1ff21b-f42f-4623-952b-ca7f2600bded",
    "type": "groups",
    "attributes": {
      "name": "Example Feature",
      "code": "EXAMPLE_ENTITLEMENT_CODE",
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
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded"
    }
  }
}
{
  "data": {
    "id": "db1ff21b-f42f-4623-952b-ca7f2600bded",
    "type": "groups",
    "attributes": {
      "name": "Example Feature",
      "code": "EXAMPLE_ENTITLEMENT_CODE",
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
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/groups/db1ff21b-f42f-4623-952b-ca7f2600bded"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/groups/\#groups-delete) Delete a group

Permanently deletes a group. The group will immediately be removed from all users,
licenses and machines. It cannot be undone.

### [_link_](https://keygen.sh/docs/api/groups/\#groups-delete-permissions) Required permissions

- group.delete

### [_link_](https://keygen.sh/docs/api/groups/\#groups-delete-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-delete-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: an admin.


### [_link_](https://keygen.sh/docs/api/groups/\#groups-delete-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-delete-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-delete-params-id) <id>

stringrequired



The identifier (UUID) of the group to be deleted.


### [_link_](https://keygen.sh/docs/api/groups/\#groups-delete-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/groups/<id>
https://api.keygen.sh/v1/accounts/<account>/groups/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
content_copyimport requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
import requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
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
  "groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d")
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

req.set_request_uri("/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d");
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

req.set_request_uri("/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d");
req.set_method(methods::DELETE);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 204 No Content

```
No content
No content
```

## [_link_](https://keygen.sh/docs/api/groups/\#groups-list) List all groups

Returns a list of groups. This will include all groups associated with the authenticated
bearer, including groups they are an owner of, as well as groups they are a member of.
The groups are returned sorted by creation date, with the most recent groups appearing
first.

### [_link_](https://keygen.sh/docs/api/groups/\#groups-list-permissions) Required permissions

- group.read

### [_link_](https://keygen.sh/docs/api/groups/\#groups-list-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-list-auths-bearer) Bearer

required



An authentication token with privileges to view the resources: either an admin, a product, a group owner, or a group member.


### [_link_](https://keygen.sh/docs/api/groups/\#groups-list-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-list-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/groups/\#groups-list-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-list-query-limit) limit

integerdefault=10



A limit on the number of groups to be returned. Limit must be a number between 1 and 100.





```
/v1/accounts/<account>/groups?limit=25
/v1/accounts/<account>/groups?limit=25
```

- #### [_link_](https://keygen.sh/docs/api/groups/\#groups-list-query-page) page

object<string, integer>



Object containing page `size` and page `number`. Page size must be a number between 1 and 100.





```
/v1/accounts/<account>/groups?page[size]=15&page[number]=2
/v1/accounts/<account>/groups?page[size]=15&page[number]=2
```


### [_link_](https://keygen.sh/docs/api/groups/\#groups-list-returns) Returns

A `200 OK` response will be returned along with a list of group objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/groups
https://api.keygen.sh/v1/accounts/<account>/groups
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/groups?limit=15", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/groups?limit=15", {
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
  "https://api.keygen.sh/v1/accounts/<account>/groups?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/groups?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/groups?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/groups?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("groups", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("groups", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/groups")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/groups")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/groups")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/groups")
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

uri_builder uri("/groups");
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

uri_builder uri("/groups");
uri.append_query("limit", 15);

req.set_request_uri(uri.to_uri());
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/groups?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/groups?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": [\
    {\
      "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d",\
      "type": "groups",\
      "attributes": {\
        "name": "Example Group",\
        "maxUsers": null,\
        "maxLicenses": null,\
        "maxMachines": null,\
        "metadata": {},\
        "created": "2022-03-07T14:13:02.959Z",\
        "updated": "2022-03-07T14:13:02.959Z"\
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
        "owners": {\
          "links": {\
            "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/owners"\
          }\
        },\
        "users": {\
          "links": {\
            "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/users"\
          }\
        },\
        "licenses": {\
          "links": {\
            "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/licenses"\
          }\
        },\
        "machines": {\
          "links": {\
            "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/machines"\
          }\
        }\
      },\
      "links": {\
        "self": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d"\
      }\
    },\
    …\
  ]
}
{
  "data": [\
    {\
      "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d",\
      "type": "groups",\
      "attributes": {\
        "name": "Example Group",\
        "maxUsers": null,\
        "maxLicenses": null,\
        "maxMachines": null,\
        "metadata": {},\
        "created": "2022-03-07T14:13:02.959Z",\
        "updated": "2022-03-07T14:13:02.959Z"\
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
        "owners": {\
          "links": {\
            "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/owners"\
          }\
        },\
        "users": {\
          "links": {\
            "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/users"\
          }\
        },\
        "licenses": {\
          "links": {\
            "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/licenses"\
          }\
        },\
        "machines": {\
          "links": {\
            "related": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d/machines"\
          }\
        }\
      },\
      "links": {\
        "self": "/v1/accounts/<account>/groups/db7e99e1-dd6d-447b-98e8-ceb354d9d85d"\
      }\
    },\
    …\
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