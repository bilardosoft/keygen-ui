# [_link_](https://keygen.sh/docs/api/processes/\#processes) Processes

Utilizing processes, you can manage application concurrency across machines. For example,
you could restrict the number of application instances allowed per-machine.

We have an example [on GitHub](https://github.com/keygen-sh/example-node-process-heartbeats)
of integrating processes into an existing machine activation workflow.

#### [_link_](https://keygen.sh/docs/api/processes/\#processes-toc) Table of contents

1. [The process object](https://keygen.sh/docs/api/processes/#processes-object)
2. [Spawn a process](https://keygen.sh/docs/api/processes/#processes-create)
3. [Retrieve a process](https://keygen.sh/docs/api/processes/#processes-retrieve)
4. [Update a process](https://keygen.sh/docs/api/processes/#processes-update)
5. [Kill a process](https://keygen.sh/docs/api/processes/#processes-delete)
6. [List all processes](https://keygen.sh/docs/api/processes/#processes-list)
7. [Ping heartbeat](https://keygen.sh/docs/api/processes/#processes-actions-ping)

## [_link_](https://keygen.sh/docs/api/processes/\#processes-object) The process object

Below you will find the various attributes for the process resource, as well
as the process resource's relationships. Processes can be used to control
application concurrency across a license's machines.

### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-attrs-pid) data.attributes.pid

string



The pid of the process. This can be an arbitrary string, but must be unique within the scope of the process it belongs to.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-attrs-status) data.attributes.status

stringread only



The status of the process's heartbeat. One of: `ALIVE`, `DEAD`, or `RESURRECTED`.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-attrs-lastHeartbeat) data.attributes.lastHeartbeat

timestamp (iso8601)read only



When the process last sent a heartbeat ping. The initial value of this attribute will be equal to the process's created timestamp.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-attrs-nextHeartbeat) data.attributes.nextHeartbeat

timestamp (iso8601)read only



The time at which the process is required to send its next heartbeat ping by. This attribute is calculated using the license policy's heartbeat duration.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-attrs-interval) data.attributes.interval

integeroptional



The heartbeat interval for the process, in seconds. The process must send heartbeat pings within this timeframe to remain alive. This is inherited from the license's policy.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-attrs-metadata) data.attributes.metadata

object<string, any>



Object containing process [metadata](https://keygen.sh/docs/api/metadata/).

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-attrs-created) data.attributes.created

timestamp (iso8601)read only



When the process was created.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-attrs-updated) data.attributes.updated

timestamp (iso8601)read only



When the process was last updated.


### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-relationships-account) data.relationships.account

individual



The account that the process belongs to.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-relationships-environment) data.relationships.environment

individual



The environment that the process belongs to.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-relationships-product) data.relationships.product

individual



The product that the process is associated with.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-relationships-license) data.relationships.license

individual



The license that the process is associated with.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-relationships-machine) data.relationships.machine

individual



The machine that the process is for.


#### Example object

```
{
  "data": {
    "id": "3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
    "type": "processes",
    "attributes": {
      "lastHeartbeat": "2022-04-18T16:39:28.323Z",
      "nextHeartbeat": "2022-04-18T16:49:28.323Z",
      "interval": 600,
      "status": "ALIVE",
      "pid": "1337",
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
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3"
    }
  }
}
{
  "data": {
    "id": "3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
    "type": "processes",
    "attributes": {
      "lastHeartbeat": "2022-04-18T16:39:28.323Z",
      "nextHeartbeat": "2022-04-18T16:49:28.323Z",
      "interval": 600,
      "status": "ALIVE",
      "pid": "1337",
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
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/processes/\#processes-create) Spawn a process

Spawns (creates) a new process resource for a machine.

When spawning a process, [a heartbeat ping frequency](https://keygen.sh/docs/api/processes/#processes-actions-ping) **must**
be maintained in order for the process to stay alive. This is in contrast to machine
heartbeats, which **may** be maintained, i.e. machine pings are optional, process
pings are required.

### [_link_](https://keygen.sh/docs/api/processes/\#processes-create-permissions) Required permissions

- process.create

### [_link_](https://keygen.sh/docs/api/processes/\#processes-create-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-create-auths-bearer) Bearer

required



An authentication token with privileges to create the resource: either an admin, the product it belongs to, the license it belongs to (via license key or a license token), or the user it belongs to via the machine or license owner (unless the license is protected).


### [_link_](https://keygen.sh/docs/api/processes/\#processes-create-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-create-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-attrs-pid) data.attributes.pid

stringrequired



The pid of the process. This can be an arbitrary string, but must be unique within the scope of the machine it belongs to.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-object-attrs-metadata) data.attributes.metadata

object<string, any>optional



Object containing process [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/processes/\#processes-create-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-create-relationships-machine) data.relationships.machine

[linkage<machine>](https://keygen.sh/docs/api/relationships/)required



The machine the process is for.


### [_link_](https://keygen.sh/docs/api/processes/\#processes-create-returns) Returns

A `201 Created` response will be returned along with the new process object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/processes
https://api.keygen.sh/v1/accounts/<account>/processes
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/processes", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "processes",
      "attributes": {
        "pid": "1337"
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

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/processes", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "processes",
      "attributes": {
        "pid": "1337"
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
  "https://api.keygen.sh/v1/accounts/<account>/processes",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "processes",
      "attributes": {
        "pid": "1337"
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
  "https://api.keygen.sh/v1/accounts/<account>/processes",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "processes",
      "attributes": {
        "pid": "1337"
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/processes",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "processes",\
      "attributes": [\
        "pid": "1337"\
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/processes",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "processes",\
      "attributes": [\
        "pid": "1337"\
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
var request = new RestRequest("processes", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "processes",
    attributes = new {
      pid = "1337",
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
var request = new RestRequest("processes", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "processes",
    attributes = new {
      pid = "1337",
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
    "type" to "processes",
    "attributes" to mapOf(
      "pid" to "1337",
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

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/processes")
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
    "type" to "processes",
    "attributes" to mapOf(
      "pid" to "1337",
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

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/processes")
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
    entry("type", "processes"),
    entry("attributes", ofEntries(
      entry("pid", "1337"),
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

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/processes")
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
    entry("type", "processes"),
    entry("attributes", ofEntries(
      entry("pid", "1337"),
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

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/processes")
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
attrs["pid"] = value::string("1337");

value machine_;
machine_["type"] = value::string("machines");
machine_["id"] = value::string("79c95ba5-a7bc-474e-ad1b-af12f7736efd");

value machine;
machine["data"] = machine_;

value rels;
rels["machine"] = machine;

value data;
data["type"] = value::string("processes");
data["attributes"] = attrs;
data["relationships"] = rels;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/processes");
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
attrs["pid"] = value::string("1337");

value machine_;
machine_["type"] = value::string("machines");
machine_["id"] = value::string("79c95ba5-a7bc-474e-ad1b-af12f7736efd");

value machine;
machine["data"] = machine_;

value rels;
rels["machine"] = machine;

value data;
data["type"] = value::string("processes");
data["attributes"] = attrs;
data["relationships"] = rels;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/processes");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/processes \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "processes",
          "attributes": {
            "pid": "1337"
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
curl -X POST https://api.keygen.sh/v1/accounts/<account>/processes \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "processes",
          "attributes": {
            "pid": "1337"
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
    "id": "3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
    "type": "processes",
    "attributes": {
      "lastHeartbeat": "2022-04-18T16:39:28.323Z",
      "nextHeartbeat": "2022-04-18T16:49:28.323Z",
      "interval": 600,
      "status": "ALIVE",
      "pid": "1337",
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
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3"
    }
  }
}
{
  "data": {
    "id": "3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
    "type": "processes",
    "attributes": {
      "lastHeartbeat": "2022-04-18T16:39:28.323Z",
      "nextHeartbeat": "2022-04-18T16:49:28.323Z",
      "interval": 600,
      "status": "ALIVE",
      "pid": "1337",
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
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/processes/\#processes-retrieve) Retrieve a process

Retrieves the details of an existing process.

### [_link_](https://keygen.sh/docs/api/processes/\#processes-retrieve-permissions) Required permissions

- process.read

### [_link_](https://keygen.sh/docs/api/processes/\#processes-retrieve-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-retrieve-auths-bearer) Bearer

required



An authentication token with privileges to view the resource: either an admin, a product which the owning machine belongs to, the license it belongs to (via license key or a license token), or the user it belongs to.


### [_link_](https://keygen.sh/docs/api/processes/\#processes-retrieve-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-retrieve-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-retrieve-params-id) <id>

stringrequired



The identifier (UUID) of the process to be retrieved.


### [_link_](https://keygen.sh/docs/api/processes/\#processes-retrieve-returns) Returns

A `200 OK` response will be returned along with a process object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/processes/<id>
https://api.keygen.sh/v1/accounts/<account>/processes/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3", {
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
  "https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
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
  "processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3")
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

req.set_request_uri("/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3");
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

req.set_request_uri("/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3");
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
    "type": "processes",
    "attributes": {
      "lastHeartbeat": "2022-04-18T16:39:28.323Z",
      "nextHeartbeat": "2022-04-18T16:49:28.323Z",
      "interval": 600,
      "status": "ALIVE",
      "pid": "1337",
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
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3"
    }
  }
}
{
  "data": {
    "id": "3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
    "type": "processes",
    "attributes": {
      "lastHeartbeat": "2022-04-18T16:39:28.323Z",
      "nextHeartbeat": "2022-04-18T16:49:28.323Z",
      "interval": 600,
      "status": "ALIVE",
      "pid": "1337",
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
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/processes/\#processes-update) Update a process

Updates the specified process resource by setting the values of the parameters
passed. Any parameters not provided will be left unchanged.

### [_link_](https://keygen.sh/docs/api/processes/\#processes-update-permissions) Required permissions

- process.update

### [_link_](https://keygen.sh/docs/api/processes/\#processes-update-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-update-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/processes/\#processes-update-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-update-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-update-params-id) <id>

stringrequired



The identifier (UUID) of the process to be updated.


### [_link_](https://keygen.sh/docs/api/processes/\#processes-update-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-update-attrs-metadata) data.attributes.metadata

object<string, any>optionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



Object containing process [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/processes/\#processes-update-returns) Returns

A `200 OK` response will be returned along with the updated process object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/processes/<id>
https://api.keygen.sh/v1/accounts/<account>/processes/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "processes",
      "attributes": {
        "metadata": {
          "hostname": "node-42"
        }
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "processes",
      "attributes": {
        "metadata": {
          "hostname": "node-42"
        }
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "processes",
      "attributes": {
        "metadata": {
          "hostname": "node-42"
        }
      }
    }
  })
).json()
import requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "processes",
      "attributes": {
        "metadata": {
          "hostname": "node-42"
        }
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "processes",\
      "attributes": [\
        "metadata": ["hostname": "node-42"]\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "processes",\
      "attributes": [\
        "metadata": ["hostname": "node-42"]\
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
  "processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "processes",
    attributes = new {
      metadata = new {
        hostname = "node-42"
      }
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "processes",
    attributes = new {
      metadata = new {
        hostname = "node-42"
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
    "type" to "processes",
    "attributes" to mapOf(
      "metadata" to mapOf(
        "hostname" to "node-42"
      )
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3")
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
    "type" to "processes",
    "attributes" to mapOf(
      "metadata" to mapOf(
        "hostname" to "node-42"
      )
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3")
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
    entry("type", "processes"),
    entry("attributes", ofEntries(
      entry("metadata", ofEntries(
        entry("hostname", "node-42")
      ))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3")
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
    entry("type", "processes"),
    entry("attributes", ofEntries(
      entry("metadata", ofEntries(
        entry("hostname", "node-42")
      ))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3")
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
attrs["hostname"] = value::string("node-42");

value attrs;
attrs["metadata"] = metadata;

value data;
data["type"] = value::string("processes");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3");
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
attrs["hostname"] = value::string("node-42");

value attrs;
attrs["metadata"] = metadata;

value data;
data["type"] = value::string("processes");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3");
req.set_method(methods::PATCH);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PATCH https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "processes",
          "attributes": {
            "metadata": { "hostname": "node-42" }
          }
        }
      }'
curl -X PATCH https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "processes",
          "attributes": {
            "metadata": { "hostname": "node-42" }
          }
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
    "type": "processes",
    "attributes": {
      "lastHeartbeat": "2022-04-18T16:39:28.323Z",
      "nextHeartbeat": "2022-04-18T16:49:28.323Z",
      "interval": 600,
      "status": "ALIVE",
      "pid": "1337",
      "created": "2022-04-18T16:39:28.410Z",
      "updated": "2022-04-18T16:39:28.410Z",
      "metadata": {
        "hostname": "node-42"
      }
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
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3"
    }
  }
}
{
  "data": {
    "id": "3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
    "type": "processes",
    "attributes": {
      "lastHeartbeat": "2022-04-18T16:39:28.323Z",
      "nextHeartbeat": "2022-04-18T16:49:28.323Z",
      "interval": 600,
      "status": "ALIVE",
      "pid": "1337",
      "created": "2022-04-18T16:39:28.410Z",
      "updated": "2022-04-18T16:39:28.410Z",
      "metadata": {
        "hostname": "node-42"
      }
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
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3"
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/processes/\#processes-delete) Kill a process

Permanently kills (deletes) a process. It cannot be undone.

### [_link_](https://keygen.sh/docs/api/processes/\#processes-delete-permissions) Required permissions

- process.delete

### [_link_](https://keygen.sh/docs/api/processes/\#processes-delete-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-delete-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, the product it belongs to, the license it belongs to (via license key or a license token), or the user it belongs to via the machine or license owner (unless the license is protected).


### [_link_](https://keygen.sh/docs/api/processes/\#processes-delete-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-delete-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-delete-params-id) <id>

stringrequired



The identifier (UUID) of the process to be deleted.


### [_link_](https://keygen.sh/docs/api/processes/\#processes-delete-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/processes/<id>
https://api.keygen.sh/v1/accounts/<account>/processes/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
content_copyimport requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
import requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
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
  "processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3")
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

req.set_request_uri("/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3");
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

req.set_request_uri("/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3");
req.set_method(methods::DELETE);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 204 No Content

```
No content
No content
```

## [_link_](https://keygen.sh/docs/api/processes/\#processes-list) List all processes

Returns a list of processes. The processes are returned sorted by creation date,
with the most recent processes appearing first. Resources are automatically
scoped to the authenticated bearer e.g. when authenticated as a user,
only processes for that specific user will be listed.

### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-permissions) Required permissions

- process.read

### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-auths-bearer) Bearer

required



An authentication token with privileges to view the resources: either an admin, a product which the owning license belongs to, the license which the processes belong to (via license key or a license token), or the user which the processes belong to.


### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-query-limit) limit

integerdefault=10



A limit on the number of processes to be returned. Limit must be a number between 1 and 100.





```
/v1/accounts/<account>/processes?limit=25
/v1/accounts/<account>/processes?limit=25
```

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-query-page) page

object<string, integer>



Object containing page `size` and page `number`. Page size must be a number between 1 and 100.





```
/v1/accounts/<account>/processes?page[size]=15&page[number]=2
/v1/accounts/<account>/processes?page[size]=15&page[number]=2
```

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-query-machine) machine

string



The identifier (UUID) of the machine to filter by.





```
/v1/accounts/<account>/processes?machine=79c95ba5-a7bc-474e-ad1b-af12f7736efd
/v1/accounts/<account>/processes?machine=79c95ba5-a7bc-474e-ad1b-af12f7736efd
```

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-query-license) license

string



The identifier (UUID) of the license to filter by.





```
/v1/accounts/<account>/processes?license=defd49e7-f850-4acb-bb2d-fcd5693f22ce
/v1/accounts/<account>/processes?license=defd49e7-f850-4acb-bb2d-fcd5693f22ce
```

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-query-owner) owner

string



The identifier (UUID) of the owner to filter by.





```
/v1/accounts/<account>/processes?owner=3fd7ff1c-e778-4030-a81c-d2242d909258
/v1/accounts/<account>/processes?owner=3fd7ff1c-e778-4030-a81c-d2242d909258
```

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-query-user) user

string



The identifier (UUID) of the user to filter by.





```
/v1/accounts/<account>/processes?user=3fd7ff1c-e778-4030-a81c-d2242d909258
/v1/accounts/<account>/processes?user=3fd7ff1c-e778-4030-a81c-d2242d909258
```

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-query-product) product

string



The identifier (UUID) of the product to filter by.





```
/v1/accounts/<account>/processes?product=e0856109-ad5f-4141-b4ee-01951346f957
/v1/accounts/<account>/processes?product=e0856109-ad5f-4141-b4ee-01951346f957
```


### [_link_](https://keygen.sh/docs/api/processes/\#processes-list-returns) Returns

A `200 OK` response will be returned along with a list of process objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/processes
https://api.keygen.sh/v1/accounts/<account>/processes
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/processes?limit=15", {
  method: "GET",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/processes?limit=15", {
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
  "https://api.keygen.sh/v1/accounts/<account>/processes?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/processes?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/processes?limit=15",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/processes?limit=15",
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
var request = new RestRequest("processes", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("processes", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/processes")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/processes")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/processes")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/processes")
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

uri_builder uri("/processes");
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

uri_builder uri("/processes");
uri.append_query("limit", 15);

req.set_request_uri(uri.to_uri());
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/processes?limit=15 -g \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/processes?limit=15 -g \
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
      "id": "3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",\
      "type": "processes",\
      "attributes": {\
        "lastHeartbeat": "2022-04-18T16:39:28.323Z",\
        "nextHeartbeat": "2022-04-18T16:49:28.323Z",\
        "interval": 600,\
        "status": "ALIVE",\
        "pid": "1337",\
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
            "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/product"\
          },\
          "data": {\
            "type": "products",\
            "id": "e0856109-ad5f-4141-b4ee-01951346f957"\
          }\
        },\
        "license": {\
          "links": {\
            "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/license"\
          },\
          "data": {\
            "type": "licenses",\
            "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"\
          }\
        },\
        "machine": {\
          "links": {\
            "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/machine"\
          },\
          "data": {\
            "type": "machines",\
            "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"\
          }\
        }\
      },\
      "links": {\
        "self": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3"\
      }\
    },\
    …\
  ]
}
{
  "data": [\
    {\
      "id": "3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",\
      "type": "processes",\
      "attributes": {\
        "lastHeartbeat": "2022-04-18T16:39:28.323Z",\
        "nextHeartbeat": "2022-04-18T16:49:28.323Z",\
        "interval": 600,\
        "status": "ALIVE",\
        "pid": "1337",\
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
            "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/product"\
          },\
          "data": {\
            "type": "products",\
            "id": "e0856109-ad5f-4141-b4ee-01951346f957"\
          }\
        },\
        "license": {\
          "links": {\
            "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/license"\
          },\
          "data": {\
            "type": "licenses",\
            "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"\
          }\
        },\
        "machine": {\
          "links": {\
            "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/machine"\
          },\
          "data": {\
            "type": "machines",\
            "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"\
          }\
        }\
      },\
      "links": {\
        "self": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3"\
      }\
    },\
    …\
  ]
}content_copy
```

## [_link_](https://keygen.sh/docs/api/processes/\#processes-actions) Process actions

Actions for the process resource.

### [_link_](https://keygen.sh/docs/api/processes/\#processes-actions-ping) Ping

Action to maintain a process heartbeat ping frequency. When a process has not performed a
heartbeat ping within the monitor window, it will be considered dead and queued for deletion.
This can be utilized for process leasing, where a license or machine has a maximum number
of allowed processes, and each process must maintain heartbeat pings in order to remain
active. This can be used in combination with machine heartbeats.

Consider this common process leasing scenario:

1. One or more processes are spawned during application initialization, after the license has
been validated and the underlying machine has been activated.
2. Each process sends their first ping and maintains a heartbeat ping frequency, according to
the required heartbeat monitor window, to indicate that it is still alive.
3. The application crashes. The normal process kill-on-exit procedure fails to occur before
the application exits. There are now one or more "zombie" processes.
4. The heartbeat monitor detects that the process has not sent a ping within the window,
and subsequently kills the process.

**The default heartbeat monitor window is 10 minutes.** This can be configured to a different
value via the license policy's heartbeat duration attribute.

Processes will be culled according to the policy's heartbeat cull strategy, after the process's
resurrection period has passed, if set. Dead processes are culled every 2 minutes.

### [_link_](https://keygen.sh/docs/api/processes/\#processes-ping-permissions) Required permissions

- process.heartbeat.ping

### [_link_](https://keygen.sh/docs/api/processes/\#processes-ping-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-ping-auths-bearer) Bearer

required



An authentication token with privileges to ping the resource's heartbeat: either an admin, the product it belongs to, the process's license (via license key or a license token), or the user it belongs to.


### [_link_](https://keygen.sh/docs/api/processes/\#processes-ping-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-ping-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/processes/\#processes-ping-params-id) <id>

stringrequired



The identifier (UUID) of the process to ping.


### [_link_](https://keygen.sh/docs/api/processes/\#processes-ping-returns) Returns

A `200 OK` response will be returned along with the pinged process object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/processes/<id>/actions/ping
https://api.keygen.sh/v1/accounts/<account>/processes/<id>/actions/ping
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping", {
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
  "https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping",
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
  "processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping")
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

req.set_request_uri("/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping");
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

req.set_request_uri("/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/actions/ping \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
    "type": "processes",
    "attributes": {
      "lastHeartbeat": "2022-04-18T16:39:28.323Z",
      "nextHeartbeat": "2022-04-18T16:49:28.323Z",
      "interval": 600,
      "status": "ALIVE",
      "pid": "1337",
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
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3"
    }
  }
}
{
  "data": {
    "id": "3b4b4688-99e9-48d0-8b7e-14e4dcb025e3",
    "type": "processes",
    "attributes": {
      "lastHeartbeat": "2022-04-18T16:39:28.323Z",
      "nextHeartbeat": "2022-04-18T16:49:28.323Z",
      "interval": 600,
      "status": "ALIVE",
      "pid": "1337",
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
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/product"
        },
        "data": {
          "type": "products",
          "id": "e0856109-ad5f-4141-b4ee-01951346f957"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/license"
        },
        "data": {
          "type": "licenses",
          "id": "defd49e7-f850-4acb-bb2d-fcd5693f22ce"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3/machine"
        },
        "data": {
          "type": "machines",
          "id": "79c95ba5-a7bc-474e-ad1b-af12f7736efd"
        }
      }
    },
    "links": {
      "self": "/v1/accounts/<account>/processes/3b4b4688-99e9-48d0-8b7e-14e4dcb025e3"
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