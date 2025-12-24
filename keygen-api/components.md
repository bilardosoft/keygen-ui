# [_link_](https://keygen.sh/docs/api/components/\#components) Components

Utilizing components, you can manage hardware components for machines. For
example, you could fingerprint and track hardware (and even non-hardware)
components such as CPU serial number, motherboard serial number, hard-drive
ID, GPU GUID, MAC address, or even non-hardware components such as
IP address.

This allows you to offer a more sophisticated fingerprinting strategy for
machines, where a certain percentage of these components must be valid
in order to pass license validation, configurable through the policy's
component matching strategy.

This can help reduce problems related to cloning, e.g. a series of machines
all have the same device GUID due to a misconfigured or erroneous cloning
procedure, by also checking hardware components in addition to the original
device GUID.

It can also reduce superfluous activations due to a more typical machine
fingerprint changing due to a machine's underlying hardware being
upgraded.

#### [_link_](https://keygen.sh/docs/api/components/\#components-toc) Table of contents

1. [The component object](https://keygen.sh/docs/api/components/#components-object)
2. [Add a component](https://keygen.sh/docs/api/components/#components-create)
3. [Retrieve a component](https://keygen.sh/docs/api/components/#components-retrieve)
4. [Update a component](https://keygen.sh/docs/api/components/#components-update)
5. [Remove a component](https://keygen.sh/docs/api/components/#components-delete)
6. [List all components](https://keygen.sh/docs/api/components/#components-list)

## [_link_](https://keygen.sh/docs/api/components/\#components-object) The component object

Below you will find the various attributes for the component resource, as well
as the component resource's relationships. Components can be used to track
and manage a machine's hardware components.

### [_link_](https://keygen.sh/docs/api/components/\#components-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/components/\#components-object-attrs-fingerprint) data.attributes.fingerprint

string



The unique fingerprint of the component, e.g. a motherboard serial number. This can be an arbitrary string, but must be unique within the scope of the machine it belongs to or according to the policy's component uniqueness strategy.

- #### [_link_](https://keygen.sh/docs/api/components/\#components-object-attrs-name) data.attributes.name

string



The human readable-name of the component.

- #### [_link_](https://keygen.sh/docs/api/components/\#components-object-attrs-metadata) data.attributes.metadata

object<string, any>



Object containing component [metadata](https://keygen.sh/docs/api/metadata/).

- #### [_link_](https://keygen.sh/docs/api/components/\#components-object-attrs-created) data.attributes.created

timestamp (iso8601)read only



When the component was created.

- #### [_link_](https://keygen.sh/docs/api/components/\#components-object-attrs-updated) data.attributes.updated

timestamp (iso8601)read only



When the component was last updated.


### [_link_](https://keygen.sh/docs/api/components/\#components-object-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/components/\#components-object-relationships-account) data.relationships.account

individual



The account that the component belongs to.

- #### [_link_](https://keygen.sh/docs/api/components/\#components-object-relationships-environment) data.relationships.environment

individual



The environment that the component belongs to.

- #### [_link_](https://keygen.sh/docs/api/components/\#components-object-relationships-product) data.relationships.product

individual



The product that the component is associated with.

- #### [_link_](https://keygen.sh/docs/api/components/\#components-object-relationships-license) data.relationships.license

individual



The license that the component is associated with.

- #### [_link_](https://keygen.sh/docs/api/components/\#components-object-relationships-machine) data.relationships.machine

individual



The machine that the component is for.


#### Example object

```
{
  "data": {
    "id": "cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
    "type": "components",
    "attributes": {
      "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
      "name": "MOBO",
      "created": "2022-04-18T16:39:28.410Z",
      "updated": "2022-04-18T16:39:28.410Z",
      "metadata": {}
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88"
    }
  }
}
{
  "data": {
    "id": "cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
    "type": "components",
    "attributes": {
      "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
      "name": "MOBO",
      "created": "2022-04-18T16:39:28.410Z",
      "updated": "2022-04-18T16:39:28.410Z",
      "metadata": {}
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/components/\#components-create) Add a component

Adds a new component resource for a machine.

### [_link_](https://keygen.sh/docs/api/components/\#components-create-permissions) Required permissions

- component.create

### [_link_](https://keygen.sh/docs/api/components/\#components-create-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/components/\#components-create-auths-bearer) Bearer

required



An authentication token with privileges to create the resource: either an admin, the product it belongs to, the license it belongs to (via license key or a license token), or the user it belongs to via the machine or license owner (unless the license is protected).


### [_link_](https://keygen.sh/docs/api/components/\#components-create-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/components/\#components-create-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/components/\#components-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/components/\#components-object-attrs-fingerprint) data.attributes.fingerprint

stringrequired



The unique fingerprint of the component, e.g. a motherboard serial number. This can be an arbitrary string, but must be unique within the scope of the machine it belongs to or according to the policy's component uniqueness strategy.

- #### [_link_](https://keygen.sh/docs/api/components/\#components-object-attrs-name) data.attributes.name

stringrequired



The human readable-name of the component.

- #### [_link_](https://keygen.sh/docs/api/components/\#components-object-attrs-metadata) data.attributes.metadata

object<string, any>optional



Object containing component [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/components/\#components-create-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/components/\#components-create-relationships-machine) data.relationships.machine

[linkage<machine>](https://keygen.sh/docs/api/relationships/)required



The machine the component is for.


### [_link_](https://keygen.sh/docs/api/components/\#components-create-returns) Returns

A `201 Created` response will be returned along with the new component object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/components
https://api.keygen.sh/v1/accounts/<account>/components
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/components", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "components",
      "attributes": {
        "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
        "name": "GPU"
      },
      "relationships": {
        "machine": {
          "data": {
            "type": "machines",
            "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
          }
        }
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/components", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "components",
      "attributes": {
        "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
        "name": "GPU"
      },
      "relationships": {
        "machine": {
          "data": {
            "type": "machines",
            "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
          }
        }
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/components",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "components",
      "attributes": {
        "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
        "name": "GPU"
      },
      "relationships": {
        "machine": {
          "data": {
            "type": "machines",
            "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
          }
        }
      }
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/components",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "components",
      "attributes": {
        "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
        "name": "GPU"
      },
      "relationships": {
        "machine": {
          "data": {
            "type": "machines",
            "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
          }
        }
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/components",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "components",\
      "attributes": [\
        "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",\
        "name": "GPU"\
      ],\
      "relationships": [\
        "machine": [\
          "data": [\
            "type": "machines",\
            "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"\
          ]\
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/components",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "components",\
      "attributes": [\
        "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",\
        "name": "GPU"\
      ],\
      "relationships": [\
        "machine": [\
          "data": [\
            "type": "machines",\
            "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"\
          ]\
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
var request = new RestRequest("components", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "components",
    attributes = new {
      fingerprint = "7FC5BC17B8944F078539BC7F933F63DA",
      name = "GPU"
    },
    relationships = new {
      machine = new {
        data = new {
          type = "machines",
          id = "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("components", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "components",
    attributes = new {
      fingerprint = "7FC5BC17B8944F078539BC7F933F63DA",
      name = "GPU"
    },
    relationships = new {
      machine = new {
        data = new {
          type = "machines",
          id = "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
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
    "type" to "components",
    "attributes" to mapOf(
      "fingerprint" to "7FC5BC17B8944F078539BC7F933F63DA",
      "name" to "GPU"
    ),
    "relationships" to mapOf(
      "machine" to mapOf(
        "data" to mapOf(
          "type" to "machines",
          "id" to "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        )
      )
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/components")
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
    "type" to "components",
    "attributes" to mapOf(
      "fingerprint" to "7FC5BC17B8944F078539BC7F933F63DA",
      "name" to "GPU"
    ),
    "relationships" to mapOf(
      "machine" to mapOf(
        "data" to mapOf(
          "type" to "machines",
          "id" to "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        )
      )
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/components")
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
    entry("type", "components"),
    entry("attributes", ofEntries(
      entry("fingerprint", "7FC5BC17B8944F078539BC7F933F63DA"),
      entry("name", "GPU")
    )),
    entry("relationships", ofEntries(
      entry("machine", ofEntries(
        entry("data", ofEntries(
          entry("type", "machines"),
          entry("id", "79c95ba5-a7bc-474e-ad1b-af12f7736efd")
        ))
      ))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/components")
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
    entry("type", "components"),
    entry("attributes", ofEntries(
      entry("fingerprint", "7FC5BC17B8944F078539BC7F933F63DA"),
      entry("name", "GPU")
    )),
    entry("relationships", ofEntries(
      entry("machine", ofEntries(
        entry("data", ofEntries(
          entry("type", "machines"),
          entry("id", "79c95ba5-a7bc-474e-ad1b-af12f7736efd")
        ))
      ))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/components")
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
attrs["fingerprint"] = value::string("7FC5BC17B8944F078539BC7F933F63DA");
attrs["name"] = value::string("GPU");

value machine_;
machine_["type"] = value::string("machines");
machine_["id"] = value::string("79c95ba5-a7bc-474e-ad1b-af12f7736efd");

value machine;
machine["data"] = machine_;

value rels;
rels["machine"] = machine;

value data;
data["type"] = value::string("components");
data["attributes"] = attrs;
data["relationships"] = rels;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/components");
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
attrs["fingerprint"] = value::string("7FC5BC17B8944F078539BC7F933F63DA");
attrs["name"] = value::string("GPU");

value machine_;
machine_["type"] = value::string("machines");
machine_["id"] = value::string("79c95ba5-a7bc-474e-ad1b-af12f7736efd");

value machine;
machine["data"] = machine_;

value rels;
rels["machine"] = machine;

value data;
data["type"] = value::string("components");
data["attributes"] = attrs;
data["relationships"] = rels;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/components");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/components \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "components",
          "attributes": {
            "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
            "name": "GPU"
          },
          "relationships": {
            "machine": {
              "data": {
                "type": "machines",
                "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
              }
            }
          }
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/components \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "components",
          "attributes": {
            "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
            "name": "GPU"
          },
          "relationships": {
            "machine": {
              "data": {
                "type": "machines",
                "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
              }
            }
          }
        }
      }'
content_copy
```

#### Example response / 201 Created

```
{
  "data": {
    "id": "cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
    "type": "components",
    "attributes": {
      "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
      "name": "GPU",
      "created": "2022-04-18T16:39:28.410Z",
      "updated": "2022-04-18T16:39:28.410Z",
      "metadata": {}
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88"
    }
  }
}
{
  "data": {
    "id": "cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
    "type": "components",
    "attributes": {
      "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
      "name": "GPU",
      "created": "2022-04-18T16:39:28.410Z",
      "updated": "2022-04-18T16:39:28.410Z",
      "metadata": {}
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/components/\#components-retrieve) Retrieve a component

Retrieves the details of an existing component.

### [_link_](https://keygen.sh/docs/api/components/\#components-retrieve-permissions) Required permissions

- component.read

### [_link_](https://keygen.sh/docs/api/components/\#components-retrieve-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/components/\#components-retrieve-auths-bearer) Bearer

required



An authentication token with privileges to view the resource: either an admin, a product which the owning machine belongs to, the license it belongs to (via license key or a license token), or the user it belongs to.


### [_link_](https://keygen.sh/docs/api/components/\#components-retrieve-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/components/\#components-retrieve-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/components/\#components-retrieve-params-id) <id>

stringrequired



The identifier (UUID) of the component to be retrieved.


### [_link_](https://keygen.sh/docs/api/components/\#components-retrieve-returns) Returns

A `200 OK` response will be returned along with a component object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/components/<id>
https://api.keygen.sh/v1/accounts/<account>/components/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88", {
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
  "https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
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
  "components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88")
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

req.set_request_uri("/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88");
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

req.set_request_uri("/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88");
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
    "type": "components",
    "attributes": {
      "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
      "name": "Motherboard",
      "created": "2022-04-18T16:39:28.410Z",
      "updated": "2022-04-18T16:39:28.410Z",
      "metadata": {}
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88"
    }
  }
}
{
  "data": {
    "id": "cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
    "type": "components",
    "attributes": {
      "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
      "name": "Motherboard",
      "created": "2022-04-18T16:39:28.410Z",
      "updated": "2022-04-18T16:39:28.410Z",
      "metadata": {}
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/components/\#components-update) Update a component

Updates the specified component resource by setting the values of the parameters
passed. Any parameters not provided will be left unchanged.

### [_link_](https://keygen.sh/docs/api/components/\#components-update-permissions) Required permissions

- component.update

### [_link_](https://keygen.sh/docs/api/components/\#components-update-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/components/\#components-update-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/components/\#components-update-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/components/\#components-update-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/components/\#components-update-params-id) <id>

stringrequired



The identifier (UUID) of the component to be updated.


### [_link_](https://keygen.sh/docs/api/components/\#components-update-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/components/\#components-update-attrs-name) data.attributes.name

stringoptional



The human readable-name of the component.

- #### [_link_](https://keygen.sh/docs/api/components/\#components-update-attrs-metadata) data.attributes.metadata

object<string, any>optionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



Object containing component [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/components/\#components-update-returns) Returns

A `200 OK` response will be returned along with the updated component object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/components/<id>
https://api.keygen.sh/v1/accounts/<account>/components/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "components",
      "attributes": {
        "name": "CPU"
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "components",
      "attributes": {
        "name": "CPU"
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "components",
      "attributes": {
        "name": "CPU"
      }
    }
  })
).json()
import requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "components",
      "attributes": {
        "name": "CPU"
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "components",\
      "attributes": [\
        "name": "CPU"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "components",\
      "attributes": [\
        "name": "CPU"\
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
  "components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "components",
    attributes = new {
      name = "CPU"
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "components",
    attributes = new {
      name = "CPU"
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "components",
    "attributes" to mapOf(
      "name" to "CPU"
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88")
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
    "type" to "components",
    "attributes" to mapOf(
      "name" to "CPU"
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88")
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
    entry("type", "components"),
    entry("attributes", ofEntries(
      entry("name", "CPU")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88")
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
    entry("type", "components"),
    entry("attributes", ofEntries(
      entry("name", "CPU")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88")
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
attrs["name"] = value::string("CPU");

value data;
data["type"] = value::string("components");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88");
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
attrs["name"] = value::string("CPU");

value data;
data["type"] = value::string("components");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88");
req.set_method(methods::PATCH);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PATCH https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "components",
          "attributes": {
            "name": "CPU"
          }
        }
      }'
curl -X PATCH https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "components",
          "attributes": {
            "name": "CPU"
          }
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
    "type": "components",
    "attributes": {
      "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
      "name": "CPU",
      "created": "2022-04-18T16:39:28.410Z",
      "updated": "2022-04-18T16:39:28.410Z",
      "metadata": {}
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88"
    }
  }
}
{
  "data": {
    "id": "cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
    "type": "components",
    "attributes": {
      "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",
      "name": "CPU",
      "created": "2022-04-18T16:39:28.410Z",
      "updated": "2022-04-18T16:39:28.410Z",
      "metadata": {}
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/components/\#components-delete) Remove a component

Permanently removes a component. It cannot be undone.

### [_link_](https://keygen.sh/docs/api/components/\#components-delete-permissions) Required permissions

- component.delete

### [_link_](https://keygen.sh/docs/api/components/\#components-delete-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/components/\#components-delete-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, the product it belongs to, the license it belongs to (via license key or a license token), or the user it belongs to via the machine or license owner (unless the license is protected).


### [_link_](https://keygen.sh/docs/api/components/\#components-delete-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/components/\#components-delete-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/components/\#components-delete-params-id) <id>

stringrequired



The identifier (UUID) of the component to be deleted.


### [_link_](https://keygen.sh/docs/api/components/\#components-delete-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/components/<id>
https://api.keygen.sh/v1/accounts/<account>/components/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
content_copyimport requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
import requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
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
  "components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88")
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

req.set_request_uri("/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88");
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

req.set_request_uri("/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88");
req.set_method(methods::DELETE);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 204 No Content

```
No content
No content
```

## [_link_](https://keygen.sh/docs/api/components/\#components-list) List all components

Returns a list of components. The components are returned sorted by creation date,
with the most recent components appearing first. Resources are automatically
scoped to the authenticated bearer e.g. when authenticated as a user,
only components for that specific user will be listed.

### [_link_](https://keygen.sh/docs/api/components/\#components-list-permissions) Required permissions

- component.read

### [_link_](https://keygen.sh/docs/api/components/\#components-list-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/components/\#components-list-auths-bearer) Bearer

required



An authentication token with privileges to view the resources: either an admin, a product which the owning license belongs to, the license which the components belong to (via license key or a license token), or the user which the components belong to.


### [_link_](https://keygen.sh/docs/api/components/\#components-list-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/components/\#components-list-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/components/\#components-list-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/components/\#components-list-query-limit) limit

integerdefault=10



A limit on the number of components to be returned. Limit must be a number between 1 and 100.





```
/v1/accounts/<account>/components?limit=25
/v1/accounts/<account>/components?limit=25
```

- #### [_link_](https://keygen.sh/docs/api/components/\#components-list-query-page) page

object<string, integer>



Object containing page `size` and page `number`. Page size must be a number between 1 and 100.





```
/v1/accounts/<account>/components?page[size]=15&page[number]=2
/v1/accounts/<account>/components?page[size]=15&page[number]=2
```

- #### [_link_](https://keygen.sh/docs/api/components/\#components-list-query-machine) machine

string



The identifier (UUID) of the machine to filter by.





```
/v1/accounts/<account>/components?machine=79c95ba5-a7bc-474e-ad1b-af12f7736efd
/v1/accounts/<account>/components?machine=79c95ba5-a7bc-474e-ad1b-af12f7736efd
```

- #### [_link_](https://keygen.sh/docs/api/components/\#components-list-query-license) license

string



The identifier (UUID) of the license to filter by.





```
/v1/accounts/<account>/components?license=defd49e7-f850-4acb-bb2d-fcd5693f22ce
/v1/accounts/<account>/components?license=defd49e7-f850-4acb-bb2d-fcd5693f22ce
```

- #### [_link_](https://keygen.sh/docs/api/components/\#components-list-query-owner) owner

string



The identifier (UUID) of the owner to filter by.





```
/v1/accounts/<account>/components?owner=3fd7ff1c-e778-4030-a81c-d2242d909258
/v1/accounts/<account>/components?owner=3fd7ff1c-e778-4030-a81c-d2242d909258
```

- #### [_link_](https://keygen.sh/docs/api/components/\#components-list-query-user) user

string



The identifier (UUID) of the user to filter by.





```
/v1/accounts/<account>/components?user=3fd7ff1c-e778-4030-a81c-d2242d909258
/v1/accounts/<account>/components?user=3fd7ff1c-e778-4030-a81c-d2242d909258
```

- #### [_link_](https://keygen.sh/docs/api/components/\#components-list-query-product) product

string



The identifier (UUID) of the product to filter by.





```
/v1/accounts/<account>/components?product=e0856109-ad5f-4141-b4ee-01951346f957
/v1/accounts/<account>/components?product=e0856109-ad5f-4141-b4ee-01951346f957
```


### [_link_](https://keygen.sh/docs/api/components/\#components-list-returns) Returns

A `200 OK` response will be returned along with a list of component objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/components
https://api.keygen.sh/v1/accounts/<account>/components
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/components?limit=15", {
  method: "GET",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/components?limit=15", {
  method: "GET",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/components?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/components?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/components?limit=15",
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/components?limit=15",
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("components", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("components", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/components")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/components")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/components")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/components")
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

uri_builder uri("/components");
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

uri_builder uri("/components");
uri.append_query("limit", 15);

req.set_request_uri(uri.to_uri());
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/components?limit=15 -g \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/components?limit=15 -g \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": [\
    {\
      "id": "cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",\
      "type": "components",\
      "attributes": {\
        "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",\
        "name": "Motherboard",\
        "created": "2022-04-18T16:39:28.410Z",\
        "updated": "2022-04-18T16:39:28.410Z",\
        "metadata": {}\
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
        "product": {\
          "links": {\
            "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/product"\
          },\
          "data": {\
            "type": "products",\
            "id": "e0856109-ad5f-4141-b4ee-01951346f957"\
          }\
        },\
        "license": {\
          "links": {\
            "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/license"\
          },\
          "data": {\
            "type": "licenses",\
            "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"\
          }\
        },\
        "machine": {\
          "links": {\
            "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/machine"\
          },\
          "data": {\
            "type": "machines",\
            "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"\
          }\
        }\
      },\
      "links": {\
        "self": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88"\
      }\
    },\
    …\
  ]
}
{
  "data": [\
    {\
      "id": "cbfe3e6e-9076-4abe-b23a-60ebba3f6d88",\
      "type": "components",\
      "attributes": {\
        "fingerprint": "7FC5BC17B8944F078539BC7F933F63DA",\
        "name": "Motherboard",\
        "created": "2022-04-18T16:39:28.410Z",\
        "updated": "2022-04-18T16:39:28.410Z",\
        "metadata": {}\
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
        "product": {\
          "links": {\
            "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/product"\
          },\
          "data": {\
            "type": "products",\
            "id": "e0856109-ad5f-4141-b4ee-01951346f957"\
          }\
        },\
        "license": {\
          "links": {\
            "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/license"\
          },\
          "data": {\
            "type": "licenses",\
            "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"\
          }\
        },\
        "machine": {\
          "links": {\
            "related": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88/machine"\
          },\
          "data": {\
            "type": "machines",\
            "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"\
          }\
        }\
      },\
      "links": {\
        "self": "/v1/accounts/<account>/components/cbfe3e6e-9076-4abe-b23a-60ebba3f6d88"\
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