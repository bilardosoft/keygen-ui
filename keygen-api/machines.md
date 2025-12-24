# [_link_](https://keygen.sh/docs/api/machines/\#machines) Machines

#### [_link_](https://keygen.sh/docs/api/machines/\#machines-toc) Table of contents

01. [The machine object](https://keygen.sh/docs/api/machines/#machines-object)
02. [Activate a machine](https://keygen.sh/docs/api/machines/#machines-create)
03. [Retrieve a machine](https://keygen.sh/docs/api/machines/#machines-retrieve)
04. [Update a machine](https://keygen.sh/docs/api/machines/#machines-update)
05. [Deactivate a machine](https://keygen.sh/docs/api/machines/#machines-delete)
06. [List all machines](https://keygen.sh/docs/api/machines/#machines-list)
07. [Check-out machine](https://keygen.sh/docs/api/machines/#machines-actions-check-out)
08. [Ping heartbeat](https://keygen.sh/docs/api/machines/#machines-actions-ping)
09. [Reset heartbeat](https://keygen.sh/docs/api/machines/#machines-actions-reset)
10. [Change owner](https://keygen.sh/docs/api/machines/#machines-relationships-change-owner)
11. [Change group](https://keygen.sh/docs/api/machines/#machines-relationships-change-group)

## [_link_](https://keygen.sh/docs/api/machines/\#machines-object) The machine object

Below you will find the various attributes for the machine resource, as well
as the machine resource's relationships. Machines can be used to track and
manage where your users are allowed to use your product.

### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-fingerprint) data.attributes.fingerprint

string



The fingerprint of the machine. This can be an arbitrary string, but must be unique within the scope of the license it belongs to.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-cores) data.attributes.cores

integer



The number of CPU cores for the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-memory) data.attributes.memory

integer



The amount of memory for the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-disk) data.attributes.disk

integer



The amount of disk for the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-name) data.attributes.name

string



The human-readable name of the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-ip) data.attributes.ip

string



The IP of the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-hostname) data.attributes.hostname

string



The hostname of the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-platform) data.attributes.platform

string



The platform of the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-maxProcesses) data.attributes.maxProcesses

integerread only



The maximum number of processes the machine can have associated with it. Inherited from its license.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-requireHeartbeat) data.attributes.requireHeartbeat

booleanread only



Whether or not the machine requires heartbeat pings, i.e. the policy requires heartbeats, or the machine has an active heartbeat monitor.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-heartbeatStatus) data.attributes.heartbeatStatus

stringread only



The status of the machine's heartbeat. One of: `NOT_STARTED`, `ALIVE`, `DEAD`, or `RESURRECTED`.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-heartbeatDuration) data.attributes.heartbeatDuration

integerread only



The policy's heartbeat duration. When a heartbeat monitor is active, the machine must send a heartbeat ping within this timeframe to remain activated.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-lastHeartbeat) data.attributes.lastHeartbeat

timestamp (iso8601)read only



When the machine last sent a heartbeat ping. This is `null` if the machine does not require a heartbeat.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-nextHeartbeat) data.attributes.nextHeartbeat

timestamp (iso8601)read only



The time at which the machine is required to send a heartbeat ping by. This is `null` if the machine does not require a heartbeat.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-lastCheckOut) data.attributes.lastCheckOut

timestamp (iso8601)read only



When the machine was last checked-out.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-metadata) data.attributes.metadata

object<string, any>



Object containing machine [metadata](https://keygen.sh/docs/api/metadata/).

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-created) data.attributes.created

timestamp (iso8601)read only



When the machine was created.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-updated) data.attributes.updated

timestamp (iso8601)read only



When the machine was last updated.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-relationships-account) data.relationships.account

individual



The account that the machine belongs to.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-relationships-environment) data.relationships.environment

individual



The environment that the machine belongs to.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-relationships-product) data.relationships.product

individual



The product that the machine is associated with.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-relationships-license) data.relationships.license

individual



The license that the machine is associated with.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-relationships-owner) data.relationships.owner

individualoptional



The user that owns the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-relationships-group) data.relationships.group

individualoptional



The group the machine belongs to. By default, this is inherited from the license.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-relationships-components) data.relationships.components

collection



The hardware components for the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-relationships-processes) data.relationships.processes

collection



The processes for the machine.


#### Example object

```
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/machines/\#machines-create) Activate a machine

Creates, or activates, a new machine resource for a license.

### [_link_](https://keygen.sh/docs/api/machines/\#machines-create-permissions) Required permissions

- machine.create

### [_link_](https://keygen.sh/docs/api/machines/\#machines-create-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-create-auths-bearer) Bearer

required



An authentication token with privileges to create the resource: either an admin, the product it belongs to, the license it belongs to (via license key or a license token), or an associated user via its license (unless the license is protected).


### [_link_](https://keygen.sh/docs/api/machines/\#machines-create-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-create-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-fingerprint) data.attributes.fingerprint

stringrequired



The fingerprint of the machine. This can be an arbitrary string, but must be unique within the scope of the license it belongs to.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-cores) data.attributes.cores

integeroptional



The number of CPU cores for the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-memory) data.attributes.memory

integeroptional



The amount of memory for the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-disk) data.attributes.disk

integeroptional



The amount of disk for the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-name) data.attributes.name

stringoptional



The human-readable name of the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-ip) data.attributes.ip

stringoptional



The IP of the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-hostname) data.attributes.hostname

stringoptional



The hostname of the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-platform) data.attributes.platform

stringoptional



The platform of the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-object-attrs-metadata) data.attributes.metadata

object<string, any>optional



Object containing machine [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/machines/\#machines-create-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-create-relationships-license) data.relationships.license

[linkage<license>](https://keygen.sh/docs/api/relationships/)required



The license the machine is for.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-create-relationships-owner) data.relationships.owner

[linkage<owner>](https://keygen.sh/docs/api/relationships/)optional



The user the machine belongs to. If authenticated as a license user, this relationship is required and must be the authenticated user.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-create-relationships-group) data.relationships.group

[linkage<group>](https://keygen.sh/docs/api/relationships/)optionalprotectedProtected relationships are only available for bearers with an admin, environment or product role.



The group the machine belongs to. If omitted, the group will be inherited from the license, if present.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-create-relationships-components) data.relationships.components

array<component>optional



The components for the machine. Components can be used to track hardware components for a machine.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-create-returns) Returns

A `201 Created` response will be returned along with the new machine object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/machines
https://api.keygen.sh/v1/accounts/<account>/machines
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "machines",
      "attributes": {
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
        "platform": "macOS",
        "name": "Office MacBook Pro"
      },
      "relationships": {
        "license": {
          "data": {
            "type": "licenses",
            "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
          }
        }
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "machines",
      "attributes": {
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
        "platform": "macOS",
        "name": "Office MacBook Pro"
      },
      "relationships": {
        "license": {
          "data": {
            "type": "licenses",
            "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
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
  "https://api.keygen.sh/v1/accounts/<account>/machines",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "machines",
      "attributes": {
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
        "platform": "macOS",
        "name": "Office MacBook Pro"
      },
      "relationships": {
        "license": {
          "data": {
            "type": "licenses",
            "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
          }
        }
      }
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/machines",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "machines",
      "attributes": {
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
        "platform": "macOS",
        "name": "Office MacBook Pro"
      },
      "relationships": {
        "license": {
          "data": {
            "type": "licenses",
            "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
          }
        }
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "machines",\
      "attributes": [\
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",\
        "platform": "macOS",\
        "name": "Office MacBook Pro"\
      ],\
      "relationships": [\
        "license": [\
          "data": [\
            "type": "licenses",\
            "id": "4097d726-6cc5-4156-8575-3a96387e19b4"\
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "machines",\
      "attributes": [\
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",\
        "platform": "macOS",\
        "name": "Office MacBook Pro"\
      ],\
      "relationships": [\
        "license": [\
          "data": [\
            "type": "licenses",\
            "id": "4097d726-6cc5-4156-8575-3a96387e19b4"\
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
var request = new RestRequest("machines", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "machines",
    attributes = new {
      fingerprint = "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      platform = "macOS",
      name = "Office MacBook Pro"
    },
    relationships = new {
      license = new {
        data = new {
          type = "licenses",
          id = "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      }
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("machines", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "machines",
    attributes = new {
      fingerprint = "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      platform = "macOS",
      name = "Office MacBook Pro"
    },
    relationships = new {
      license = new {
        data = new {
          type = "licenses",
          id = "4097d726-6cc5-4156-8575-3a96387e19b4"
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
    "type" to "machines",
    "attributes" to mapOf(
      "fingerprint" to "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "platform" to "macOS",
      "name" to "Office MacBook Pro"
    ),
    "relationships" to mapOf(
      "license" to mapOf(
        "data" to mapOf(
          "type" to "licenses",
          "id" to "4097d726-6cc5-4156-8575-3a96387e19b4"
        )
      )
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines")
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
    "type" to "machines",
    "attributes" to mapOf(
      "fingerprint" to "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "platform" to "macOS",
      "name" to "Office MacBook Pro"
    ),
    "relationships" to mapOf(
      "license" to mapOf(
        "data" to mapOf(
          "type" to "licenses",
          "id" to "4097d726-6cc5-4156-8575-3a96387e19b4"
        )
      )
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines")
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
    entry("type", "machines"),
    entry("attributes", ofEntries(
      entry("fingerprint", "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"),
      entry("platform", "macOS"),
      entry("name", "Office MacBook Pro")
    )),
    entry("relationships", ofEntries(
      entry("license", ofEntries(
        entry("data", ofEntries(
          entry("type", "licenses"),
          entry("id", "4097d726-6cc5-4156-8575-3a96387e19b4")
        ))
      ))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines")
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
    entry("type", "machines"),
    entry("attributes", ofEntries(
      entry("fingerprint", "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"),
      entry("platform", "macOS"),
      entry("name", "Office MacBook Pro")
    )),
    entry("relationships", ofEntries(
      entry("license", ofEntries(
        entry("data", ofEntries(
          entry("type", "licenses"),
          entry("id", "4097d726-6cc5-4156-8575-3a96387e19b4")
        ))
      ))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines")
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
attrs["fingerprint"] = value::string("4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC");
attrs["platform"] = value::string("macOS");
attrs["name"] = value::string("Office MacBook Pro");

value license_;
license_["type"] = value::string("licenses");
license_["id"] = value::string("4097d726-6cc5-4156-8575-3a96387e19b4");

value license;
license["data"] = license_;

value rels;
rels["license"] = license;

value data;
data["type"] = value::string("machines");
data["attributes"] = attrs;
data["relationships"] = rels;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/machines");
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
attrs["fingerprint"] = value::string("4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC");
attrs["platform"] = value::string("macOS");
attrs["name"] = value::string("Office MacBook Pro");

value license_;
license_["type"] = value::string("licenses");
license_["id"] = value::string("4097d726-6cc5-4156-8575-3a96387e19b4");

value license;
license["data"] = license_;

value rels;
rels["license"] = license;

value data;
data["type"] = value::string("machines");
data["attributes"] = attrs;
data["relationships"] = rels;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/machines");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/machines \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "machines",
          "attributes": {
            "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
            "platform": "macOS",
            "name": "Office MacBook Pro"
          },
          "relationships": {
            "license": {
              "data": {
                "type": "licenses",
                "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
              }
            }
          }
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/machines \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "machines",
          "attributes": {
            "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
            "platform": "macOS",
            "name": "Office MacBook Pro"
          },
          "relationships": {
            "license": {
              "data": {
                "type": "licenses",
                "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
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
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/machines/\#machines-retrieve) Retrieve a machine

Retrieves the details of an existing machine.

### [_link_](https://keygen.sh/docs/api/machines/\#machines-retrieve-permissions) Required permissions

- machine.read

### [_link_](https://keygen.sh/docs/api/machines/\#machines-retrieve-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-retrieve-auths-bearer) Bearer

required



An authentication token with privileges to view the resource: either an admin, a product which the owning license belongs to, the license it belongs to (via license key or a license token), or the user it belongs to.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-retrieve-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-retrieve-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-retrieve-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe fingerprint of the machine to be retrieved.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-retrieve-returns) Returns

A `200 OK` response will be returned along with a machine object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/machines/<id>
https://api.keygen.sh/v1/accounts/<account>/machines/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/eef41cf5-f32e-4dab-a867-b9738d87285b", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/eef41cf5-f32e-4dab-a867-b9738d87285b", {
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
  "https://api.keygen.sh/v1/accounts/<account>/machines/eef41cf5-f32e-4dab-a867-b9738d87285b",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/machines/eef41cf5-f32e-4dab-a867-b9738d87285b",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/eef41cf5-f32e-4dab-a867-b9738d87285b",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/eef41cf5-f32e-4dab-a867-b9738d87285b",
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
  "machines/eef41cf5-f32e-4dab-a867-b9738d87285b",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "machines/eef41cf5-f32e-4dab-a867-b9738d87285b",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/machines/eef41cf5-f32e-4dab-a867-b9738d87285b")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/machines/eef41cf5-f32e-4dab-a867-b9738d87285b")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/machines/eef41cf5-f32e-4dab-a867-b9738d87285b")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/machines/eef41cf5-f32e-4dab-a867-b9738d87285b")
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

req.set_request_uri("/machines/eef41cf5-f32e-4dab-a867-b9738d87285b");
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

req.set_request_uri("/machines/eef41cf5-f32e-4dab-a867-b9738d87285b");
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/machines/eef41cf5-f32e-4dab-a867-b9738d87285b \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/machines/eef41cf5-f32e-4dab-a867-b9738d87285b \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/machines/\#machines-update) Update a machine

Updates the specified machine resource by setting the values of the parameters
passed. Any parameters not provided will be left unchanged.

### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-permissions) Required permissions

- machine.update

### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, the product it belongs to, or if the license is unprotected, the user it belongs to or the license it belongs to (via license key or a license token).


### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe fingerprint of the machine to be updated.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-attrs-name) data.attributes.name

stringoptional



The human-readable name of the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-attrs-ip) data.attributes.ip

stringoptional



The IP of the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-attrs-hostname) data.attributes.hostname

stringoptional



The hostname of the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-attrs-platform) data.attributes.platform

stringoptional



The platform of the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-attrs-cores) data.attributes.cores

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The number of CPU cores for the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-attrs-memory) data.attributes.memory

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The amount of memory for the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-attrs-disk) data.attributes.disk

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The amount of disk for the machine.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-attrs-metadata) data.attributes.metadata

object<string, any>optionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



Object containing machine [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/machines/\#machines-update-returns) Returns

A `200 OK` response will be returned along with the updated machine object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/machines/<id>
https://api.keygen.sh/v1/accounts/<account>/machines/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "machines",
      "attributes": {
        "ip": "192.168.1.1"
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "machines",
      "attributes": {
        "ip": "192.168.1.1"
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "machines",
      "attributes": {
        "ip": "192.168.1.1"
      }
    }
  })
).json()
import requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "machines",
      "attributes": {
        "ip": "192.168.1.1"
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "machines",\
      "attributes": [\
        "ip": "192.168.1.1"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "machines",\
      "attributes": [\
        "ip": "192.168.1.1"\
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
  "machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "machines",
    attributes = new {
      ip = "192.168.1.1"
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "machines",
    attributes = new {
      ip = "192.168.1.1"
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "machines",
    "attributes" to mapOf(
      "ip" to "192.168.1.1"
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827")
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
    "type" to "machines",
    "attributes" to mapOf(
      "ip" to "192.168.1.1"
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827")
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
    entry("type", "machines"),
    entry("attributes", ofEntries(
      entry("ip", "192.168.1.1")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827")
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
    entry("type", "machines"),
    entry("attributes", ofEntries(
      entry("ip", "192.168.1.1")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827")
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
attrs["ip"] = value::string("192.168.1.1");

value data;
data["type"] = value::string("machines");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827");
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
attrs["ip"] = value::string("192.168.1.1");

value data;
data["type"] = value::string("machines");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827");
req.set_method(methods::PATCH);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PATCH https://api.keygen.sh/v1/accounts/<account>/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "machines",
          "attributes": {
            "ip": "192.168.1.1",
            "cores": 16
          }
        }
      }'
curl -X PATCH https://api.keygen.sh/v1/accounts/<account>/machines/b18e3f3a-330c-4d8d-ae2e-014db21fa827 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "machines",
          "attributes": {
            "ip": "192.168.1.1",
            "cores": 16
          }
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": 16,
      "memory": null,
      "disk": null,
      "ip": "192.168.1.1",
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": 16,
      "memory": null,
      "disk": null,
      "ip": "192.168.1.1",
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/machines/\#machines-delete) Deactivate a machine

Permanently deletes, or deactivates, a machine. It cannot be undone. This will
immediately delete all processes and components associated with the machine.

### [_link_](https://keygen.sh/docs/api/machines/\#machines-delete-permissions) Required permissions

- machine.delete

### [_link_](https://keygen.sh/docs/api/machines/\#machines-delete-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-delete-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, the product it belongs to, the license it belongs to (via license key or a license token), or the user it belongs to via the machine or license owner (unless the license is protected).


### [_link_](https://keygen.sh/docs/api/machines/\#machines-delete-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-delete-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-delete-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe fingerprint of the machine to be deleted.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-delete-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/machines/<id>
https://api.keygen.sh/v1/accounts/<account>/machines/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
content_copyimport requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
import requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
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
  "machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4")
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

req.set_request_uri("/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4");
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

req.set_request_uri("/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4");
req.set_method(methods::DELETE);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 204 No Content

```
No content
No content
```

## [_link_](https://keygen.sh/docs/api/machines/\#machines-list) List all machines

Returns a list of machines. The machines are returned sorted by creation date,
with the most recent machines appearing first. Resources are automatically
scoped to the authenticated bearer e.g. when authenticated as a user,
only machines for that specific user will be listed.

### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-permissions) Required permissions

- machine.read

### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-auths-bearer) Bearer

required



An authentication token with privileges to view the resources: either an admin, a product which the owning license belongs to, the license which the machines belong to (via license key or a license token), or the user which the machines belong to.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-query-limit) limit

integerdefault=10



A limit on the number of machines to be returned. Limit must be a number between 1 and 100.





```
/v1/accounts/<account>/machines?limit=25
/v1/accounts/<account>/machines?limit=25
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-query-page) page

object<string, integer>



Object containing page `size` and page `number`. Page size must be a number between 1 and 100.





```
/v1/accounts/<account>/machines?page[size]=15&page[number]=2
/v1/accounts/<account>/machines?page[size]=15&page[number]=2
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-query-fingerprint) fingerprint

string



The machine fingerprint to filter by.





```
/v1/accounts/<account>/machines?fingerprint=4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC
/v1/accounts/<account>/machines?fingerprint=4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-query-ip) ip

string



The machine IP address to filter by.





```
/v1/accounts/<account>/machines?ip=192.168.1.1
/v1/accounts/<account>/machines?ip=192.168.1.1
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-query-hostname) hostname

string



The machine hostname to filter by.





```
/v1/accounts/<account>/machines?hostname=CoolHostname
/v1/accounts/<account>/machines?hostname=CoolHostname
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-query-product) product

string



The identifier (UUID) of the product to filter by.





```
/v1/accounts/<account>/machines?product=3ab38aae-bbf7-4846-9c32-af9d94bf5ad4
/v1/accounts/<account>/machines?product=3ab38aae-bbf7-4846-9c32-af9d94bf5ad4
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-query-policy) policy

string



The identifier (UUID) of the policy to filter by.





```
/v1/accounts/<account>/machines?policy=f2a336e8-85c0-49bd-85f6-ffc15b4ac679
/v1/accounts/<account>/machines?policy=f2a336e8-85c0-49bd-85f6-ffc15b4ac679
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-query-license) license

string



The identifier (UUID) of the license to filter by.





```
/v1/accounts/<account>/machines?license=3fd7ff1c-e778-4030-a81c-d2242d909258
/v1/accounts/<account>/machines?license=3fd7ff1c-e778-4030-a81c-d2242d909258
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-query-key) key

string



The license key to filter by. Cannot be an encrypted key.





```
/v1/accounts/<account>/machines?key=C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3
/v1/accounts/<account>/machines?key=C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-query-owner) owner

string



The identifier (UUID) of the owner to filter by.





```
/v1/accounts/<account>/machines?owner=a5a154d2-f026-40fa-bc8d-a7e3ca415298
/v1/accounts/<account>/machines?owner=a5a154d2-f026-40fa-bc8d-a7e3ca415298
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-query-group) group

string



The identifier (UUID) of the group to filter by.





```
/v1/accounts/<account>/machines?group=db7e99e1-dd6d-447b-98e8-ceb354d9d85d
/v1/accounts/<account>/machines?group=db7e99e1-dd6d-447b-98e8-ceb354d9d85d
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-query-metadata) metadata

object<string, any>



The metadata object to filter by.





```
/v1/accounts/<account>/machines?metadata[nodeId]=68666bf8b
/v1/accounts/<account>/machines?metadata[nodeId]=68666bf8b
```


### [_link_](https://keygen.sh/docs/api/machines/\#machines-list-returns) Returns

A `200 OK` response will be returned along with a list of machine objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/machines
https://api.keygen.sh/v1/accounts/<account>/machines
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines?limit=15", {
  method: "GET",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines?limit=15", {
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
  "https://api.keygen.sh/v1/accounts/<account>/machines?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/machines?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines?limit=15",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines?limit=15",
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
var request = new RestRequest("machines", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("machines", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/machines")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/machines")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/machines")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/machines")
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

uri_builder uri("/machines");
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

uri_builder uri("/machines");
uri.append_query("limit", 15);

req.set_request_uri(uri.to_uri());
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/machines?limit=15 -g \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/machines?limit=15 -g \
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
      "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",\
      "type": "machines",\
      "links": {\
        "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"\
      },\
      "attributes": {\
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",\
        "cores": null,\
        "memory": null,\
        "disk": null,\
        "ip": null,\
        "hostname": null,\
        "platform": "macOS",\
        "name": "Office MacBook Pro",\
        "maxProcesses": null,\
        "requireHeartbeat": false,\
        "heartbeatStatus": "NOT_STARTED",\
        "heartbeatDuration": 600,\
        "lastHeartbeat": null,\
        "nextHeartbeat": null,\
        "lastCheckOut": null,\
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
        "product": {\
          "links": {\
            "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"\
          },\
          "data": {\
            "type": "products",\
            "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"\
          }\
        },\
        "license": {\
          "links": {\
            "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"\
          },\
          "data": {\
            "type": "licenses",\
            "id": "4097d726-6cc5-4156-8575-3a96387e19b4"\
          }\
        },\
        "group": {\
          "links": {\
            "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"\
          },\
          "data": null\
        },\
        "owner": {\
          "links": {\
            "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"\
          },\
          "data": {\
            "type": "users",\
            "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"\
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
      "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",\
      "type": "machines",\
      "links": {\
        "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"\
      },\
      "attributes": {\
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",\
        "cores": null,\
        "memory": null,\
        "disk": null,\
        "ip": null,\
        "hostname": null,\
        "platform": "macOS",\
        "name": "Office MacBook Pro",\
        "maxProcesses": null,\
        "requireHeartbeat": false,\
        "heartbeatStatus": "NOT_STARTED",\
        "heartbeatDuration": 600,\
        "lastHeartbeat": null,\
        "nextHeartbeat": null,\
        "lastCheckOut": null,\
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
        "product": {\
          "links": {\
            "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"\
          },\
          "data": {\
            "type": "products",\
            "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"\
          }\
        },\
        "license": {\
          "links": {\
            "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"\
          },\
          "data": {\
            "type": "licenses",\
            "id": "4097d726-6cc5-4156-8575-3a96387e19b4"\
          }\
        },\
        "group": {\
          "links": {\
            "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"\
          },\
          "data": null\
        },\
        "owner": {\
          "links": {\
            "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"\
          },\
          "data": {\
            "type": "users",\
            "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"\
          }\
        }\
      }\
    },\
    …\
  ]
}content_copy
```

## [_link_](https://keygen.sh/docs/api/machines/\#machines-actions) Machine actions

Actions for the machine resource.

### [_link_](https://keygen.sh/docs/api/machines/\#machines-actions-check-out) Check-out machine

Action to check-out a machine. This will generate a snapshot of the machine at time
of checkout, encoded into a machine file certificate that can be decoded and used
for licensing offline and air-gapped environments. The algorithm will depend on
the license policy's `scheme`, or the provided `algorithm`.

Machine files can be distributed using email or USB drives to air-gapped devices.

For instructions on verifying a machine file, please see [machine file verification](https://keygen.sh/docs/api/cryptography/#cryptographic-lic).

**Need to download the machine file right away?** Instead of sending a `POST` request, you can
send a `GET` request and our API will respond with the plaintext machine file certificate,
rather than a JSON response.

### [_link_](https://keygen.sh/docs/api/machines/\#machines-check-out-permissions) Required permissions

- machine.check-out
- machine.read

### [_link_](https://keygen.sh/docs/api/machines/\#machines-check-out-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-check-out-auths-bearer) Bearer

required



An authentication token with privileges to check-out the resource: either an admin, the product it belongs to, the license it belongs to (via license key or a license token), or if the license's policy is unprotected, the user it belongs to.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-check-out-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-check-out-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-check-out-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe fingerprint of the machine to check-out.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-check-out-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-check-out-query-ttl) ttl

integeroptionaldefault=2629746 (1 month)



The time-to-live (TTL) of the checked out machine file, in seconds. This will be used in calculating the machine file's expiry. Must be at least 1 hour (3600). May be set to `null`, but we typically do not recommend that, as then its perpetual and irrevocable.



Setting a TTL allows changes to the machine or machine's license object, e.g. expiry, suspension, or metadata changes, to _eventually_ propagate to all offline installations. No expiry means these changes are not guaranteed to propagate, since no re-checkout is required.





```
/v1/accounts/<account>/machines/<id>/actions/check-out?ttl=86400
/v1/accounts/<account>/machines/<id>/actions/check-out?ttl=86400
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-check-out-query-include) include

array<string>optional



Include relationship data in the machine file. Can be any combination of: `license.entitlements`, `license.product`, `license.policy`, `license.owner`, `license.users`, `license`, `owner`, `components`, `environment`, or `group`.



Please note that the request bearer must have permission to read all included objects. That means that, by default, licenses and users cannot include the environment, product or policy objects; in addition, licenses cannot include the user object.





```
/v1/accounts/<account>/machines/<id>/actions/check-out?include=license.entitlements,license.owner,license
/v1/accounts/<account>/machines/<id>/actions/check-out?include=license.entitlements,license.owner,license
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-check-out-query-encrypt) encrypt

booleanoptional



Whether or not to encrypt the machine file. The machine file will be encrypted using AES-256-GCM, with a SHA256 digest of the license's key concatenated with the machine's fingerprint as the secret.



This cannot be used in combination with the `algorithm` parameter.





```
/v1/accounts/<account>/machines/<id>/actions/check-out?encrypt=1
/v1/accounts/<account>/machines/<id>/actions/check-out?encrypt=1
```

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-check-out-query-algorithm) algorithm

stringoptional



The algorithm of the checked out machine file. This will be used to determine whether or not the machine file is encrypted, and what signing algorithm to use. Must be one of: `aes-256-gcm+ed25519`, `aes-256-gcm+ecdsa-p256`, `aes-256-gcm+rsa-pss-sha256`, `aes-256-gcm+rsa-sha256`, `base64+ed25519`, `base64+ecdsa-p256`, `base64+rsa-pss-sha256`, or `base64+rsa-sha256`.



This cannot be used in combination with the `encrypt` parameter.





```
/v1/accounts/<account>/machines/<id>/actions/check-out?algorithm=aes-256-gcm%2Brsa-pss-sha256
/v1/accounts/<account>/machines/<id>/actions/check-out?algorithm=aes-256-gcm%2Brsa-pss-sha256
```


### [_link_](https://keygen.sh/docs/api/machines/\#machines-check-out-returns) Returns

A `200 OK` response will be returned along with the machine file object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/machines/<id>/actions/check-out
https://api.keygen.sh/v1/accounts/<account>/machines/<id>/actions/check-out
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out", {
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
  "https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out",
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
  "machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out")
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

req.set_request_uri("/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out");
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

req.set_request_uri("/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/check-out \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "0c5becb0-7beb-4542-94f0-0f80d7f682fd",
    "type": "machine-files",
    "attributes": {
      "certificate": "-----BEGIN MACHINE FILE-----\neyJlbmMiOiJBeG9tVFNncER6M1JPbVh1RUJiRHNtZ2VrVmJObzcyWktRNi9V\ndFpnS0N0RnRzR1dZckx6M2tjREN4V0hrYWRCSkV0ZWJpU0wrbXNoL2QvZmNN\nMnZrd2I2aUF6ekgrNFFndFpOb3VRN2M2SE5jbXFBcHFHZkhoSzdsZ2QvdjAr\nL2M5SWgxVHlQZkd0RTlGQzZtbi9KelNhOGVOejdWb1VXRmxXTjNQZHQxejht\ncm5OQ2p4U3Q4c1VUVUNzeEUvTDJpZnRBS08rZG1tVm9IYkdiQThNTjUvaHk4\nTW1XajgxUjFma2ZZMzFJbC9oY0FhZ2RkOGE0aXd1czdTQ1BqVkN6dGowQWNP\nSnM2WVJ0TzVaMFJ0VU9TYitQWXVHbzl0RERUS053RHgyT0J6K3Z5NWczWURq\nUTZOQjhIcXE4ODN4Umg1Umx5UmVYQml3eFJhb2VyL3IyeENvU3E0ZkNGTDNG\nQmFYVjNCMnYrcGIyTHJob05BaTd0L01oQ3BNdGxrY2Z3SlBpdXVVdk8yMkRj\nekhMTHFrMTF1YkZLLzhRQlN4UnVtSm1mbG5sQlYvVlFEU1Zla0pLdE8wQWZ3\nUEtyR1l6ZTExcVoxcWp2N0xFTGE2N001cjA3WFlhN3ByKzFseWV6OXpHdGxv\nbm5Hd2JVZDBTWUtuYTdkT2NqRVJkeFBpblNtdnpTdWF3T2VRSFdVdUdWZVJm\nZzJwRWl3UnVSdjhleVBTQXJyWEE1N09LRTltbkI0K083OTN3M0xhbXozdDFs\nc3p3WTRPN3Q1WjhiZXhsbGZSVkdMOTBncDdDUk1sNXhSTDUyYmU5YjdreFd0\nZC96WCtvcUVEZ3N0ZmJabmF3OFdxdUx0Z1BZSWF0aTM3ODFHQVA3QXkxdDdo\nSzNINGUyblA3QWliaFJsZDJJVGtqQXN0TzNuc01LM211czByL1EzV1QzQnpm\naEZReDRHdWJUOTRwZ1lzZEUwZ1M2Q0ZRMFVGLzlqcjJzbyt6OTAxdllTUlhI\nVDdPMHBHdnZkQ3hSNUdJMFFLK0JlYW9obVBhSXBxaUtHVGVOU3FvTHE1Q3Q2\nRDVWbUFJR2ErcGRwcWVOV0FDeC9hVlZYZEl2dGI1Z3VMczBQbVVsZzBVMUxp\nOXlzK21tNWZNalBxZVFPQ1J5S2o3UHFibVI1MGtvamxzcFRmRW42OGVLbE5D\nRFhGTG10ci9zODZqUk0zSW0wQlc1L1dSeDRoVzlxYjBvNlBvY0sxc3RFZGkx\nL3R5NXZ0Q2UyVXcrOUQrUDRoaE0wL3pQVXg2c3NBTDEwY2x0UnFDSG5lbTdr\naFFuWkgwSERrT1RCWWIzemtsMWFiMzFaMFdlV1UvU0Zoekh6ckJPS1BTVkow\nU0ErbldydmtUMXkxbGg0QmpnaHBuVWtnMmJvKzJXbldISWErdDJ6KzB2UmJP\ndGNVOWNhOGtzbmpDcHF2QkZQVitnb2VUK2pJMG9rc3Jmd3RhM2t5QlljWkto\ndUVMeFUvTENUUG9KNUFPOTNiZmF3UFlsdXJBUVpYY01PV2hjS203bEF1alF0\nWFVSNy9kR3JBVTl1NVVvSmlOdU90Ti9YZVRzMk0ydFNNNjc1cnA2TWlUQ2Vk\nQTNKeS9udVQzRVV0NWliWUtKVnFrdEpLcHlrWXdjQkxOVkFjQ093Q2g3T2d3\nbS9HT2R1RFZKUFVwUlE3SEdGM2lWSnJXRE1SbVFMcXN1UEZwbzh3dGJEKzln\ndXdkUE5nWHhFdUltUFd2OENtbWVvK0VuSGJmaVhYeUZsRjd3VmNPZTZMNERj\nNVJmdGpxdzVzNGE4Y2R3R2JIQXJUYXJ6K3c1Z1JyU0MvdUZ2S1QySEEveFkr\nN2QyTUVPa2FJQXVSTGJkQ3gweCttMC94Qm9CczhNWSt1TzVpaUZEbGFlcExF\nU1N1bnlScEk3OHRBSVRJMERVcW5iSzZYL2NPSFJwVkNQQXRmTyswVjZ5RXFj\nai9QczRaMkoyaWE2dXBTOFd0bGRaWjlYNWJWWjBNOXpqcWw1SFQwZ0hVZGx2\nd3hQaTJUNnJ0Tk8vZmorZ0hrTG9SWUg0NG9rVkw2bjVaTFpDR0g5NU40UFFX\nYW9OZFAvQ0QyZGh5Ty9mKy9FK1p3K0xmTGZlN1JhWnZYQ1hRQ3ZHMXZ4d0lT\nNkROKzBwZGxjWVR3aFlNYVRzdG9yOVBzWXpzdy9UUzhDZVhZeDBHM3RsMEI5\nT0htV0lSSjczenpma1BQaWIwKzNQWmRlcjR3UnkzMWpYeDBsL1cwQ0lUUldo\nVERuVjIvTVhLMUw3cUJhRDM5WDJndHkvUXlZNjBRd0Q5OTVDQlE4R1J6V1Q3\nOHpNSjUvdFRRWVN3eHozVkhYZjZVWXdPcjQwa2x1VlZ2YU1WSmNsLzlsaG9i\na1JZd3BYZ3I0VFplYy9QTEJkSmhXa2xYQVZjYW5xU01IM1FaV2tGTkIzdjJJ\nQTBMQWhCMklFdjQ1cUI5bGRXNXVaRGRHQ0VDbjhsQVlDNXppb0xtQmg5bVZz\nYlFTYWlCc1U4elZVL2RlM1ZmOS9uRGU0Wng0SGdTczN1R3NHNmhlV05INTI5\nR3VHY1NieWE1ek1PRzI4LzRRdFN4QURDMTFPalRiNm9IS1RLMHBoMFNhOUR0\nNlFiSXdOeHNiOFcrMmNsUGtDblBlNkNwNVBHMlZpeUVqQnJrc2hGbUN4S255\nalVnbkJHN1RHZ05WZE9jZWJBVWF1QWdFME42UHgwQUFxSXBxY0lMbncyWWs1\nVzQxVnpvUFU5bjBHNjBySUkyZUtQK1U4SVRidWUzMk5Sd2tJSTN5djEvdEVm\nbkwwdmt0NTFSMkcrVU1rUU9vUy9nSGx2UHVGc1VWY0FXdVNuR1M3d2ljTnN0\nbUpHUWtROGdLTUcwV3BpOXMrd1pVd2xQaDkvMGxmSFI4QWRML1VIT2h0Rkgz\naHNKbnYrcFZUcXdXc09hblhnSXFXcC9NKzJjaVBNZVpoZ3RiRVNJdWpMclV5\nZ3Z6NW5WZjhLWWNReGlzeFU5NVY4YU01ZGhzdjNWVlFURjM5RnlnSy9XbDFU\nSjVQamdWcmI1SmVsV0d0ZGVSbjh6ZkR5enZPdnBySy9hT2ludjg0VGJwbm91\nT0pGejVacHlBYWJYbkxRTkFGSXJtNmRNZlJFRTllN1hjZHhsc0hBNW5aTWhq\nWEk1aURFRXlVSkR2eVJlOHpjOGxGNGNMQWZxZUN6VjByVzh4enZnU2RyZERp\nWk5Ya2dxRnNJajVianZUK3NXZzJFeExwZnQrODNJSW9LaVE2djJ2SzBiQk9O\nRDBYb25weFRLV3BnVCtVMGx4amxQV3E1M1NXNjcyWGkycEtwRTBQdUYxWUlh\nZDZLSFA2ajR4NXRqdEgrMUIxZ3ZiQU1xbFZ6KzJ6V1lGZVl4cFBlRXBXSHpZ\nd2Rpemg0Q290Y29NemxZbWQ3TmNMczNrSU5iVEh5WVYxSkRKNmJBbEpWZGlu\nSGhGck9VeU0vS3BJTkU2ZWxabkhVbkNHWjgwcFdWLzM5d3EyR1JrREpVM0pp\nVDduTCsrQ2pMVTZJRVJiNkNuN3N0dE5Yd0cvTHRnM3VWR3VFaU5hVXpZQnBE\nVjdmT3RDNkRGS24zK3ZlRlFwbTI3K29GRGhWMjZXdnlJb2VlNGc4N2Y4ZTNo\ndzNKTXFZbThFUG5DU3VoNEVDZ2Y5Nm1sZkt1aEViYmQzd1pQaC90YVREWnI5\nQ20ycTVOVlViSFBCajdtaEtvdDV6MjdYNWRJSmFqbjZYUjBSL1MyNkd2OVpl\nK29NKzFRZEVOOUNxVTU1a2VNb01hWXdGcGlXU2dIWHJjS2hoZGVBVjJWc29D\nUWpRZzRKeUxPY3dFNHBDeWVzWi9MRWZMM2xkaGd0emlxRmt3V0k4ZzR2N2k0\nWVdlK0JoWitpK280N2E1bjhMZWdiU2JKaHFPZTNNd3JQdjh0Z21mSGJhNnJu\nVGxaYzBWT0FxTzE3dEpTWU9BdTZkeG9mQk9BOXQwVDVwVitPSnRlYWRGOVN5\nN3d1SUNncVkzYWhQYVVjWnF0TEtGdWY4c0wrVEkyVFdWYWJ3VDBBQXM0WG1a\ndk16elhxUVIxazMvTys1RTlKbnJESGM3RGJkd1NySHF5OEtsSk5JSm1FZHNr\nVk5TYXI4L1JIMXVkSHdoNjlzbjhiL0hDTTlJUGtwT3lFcWRCR2xxUmpvZXdT\nOVh4dGpudGhYUDNXaDZZbVhlMkNWU08zWEo0UGFobTBlYWphOWpRdklFSWZK\nallRVHY3Z2NnU0N5NUluUEc0VFFiYmZ4b2VnRkZ0bFh4MVBBWnprRzNUcWc3\nTTVidURVNHF3UE5UYWFieWNhbXd6cDVvUmxJNGJ6K0k1WkpYSnZoNC84cWF5\nMjlNN2ZleGVtMmprcEhEdElmSlNKcFhYTERFT0h6Y1FFZmo4Si85WXBybGsx\nTGgrYWpvZ2JkQnJ2dFB3dXFEUjNKeXBaZ1NjNzNnVEV0S1dMOVRYTWJHV3J3\nOW5wZTFlL3hTV1B5TkNRK3VRUEh1Sml0UlRnOGQ5WmZFeGpMd2lSemJFNjhn\nS3FESGhseDJiemNBN0FkSy9zc2JyR1NFeDgzK21ib1VLT1FXVWtMTmlsUS9x\nN3hXT29reWUyN2VQKzJRSHp3N3NwWlVsSmpEeVdsWU4ycUc5cWcvR201dk9R\nbWJseFMrTG9CRE0wYUtpTEpCTU85ZkpqQ1pJYmsyRVR2b3pzVk8yb1RmKzVl\neWl6OGhsT3lHZzFNek9PR3J5ZlR0VXIyMFMyYlU3TDRuSXUwdVFoMXB4Q2Ni\nTWZhVUlneXI0RG5HS2QxUEtQekdTaDlpbmtjVExlSllsK2o5bWZzMzQwWXpH\nWEV5L0ZhZ3Axc2hyOHJlSlFVL0IzOGNMZmdXZWwvOFBpS1ZJZ2xiaXFzRklz\ndkcrQys0UGxNTTkwUW1ueHowUjd3b1Z2ckk5R1ZRd25LL1QzQ3NqMHJVNkdT\nazVPc1d3dmlNdzVabjI2UlNSQmc3c2VldnJzUlZEend6ZjE4RzJpNkxkQWFj\nb0VBb2RaZzNkNE5Sb0MwckNoK3ZyUTJ1emVteXNpMDhidDlsUnpYdCtEbTRY\nOHJ5ZldNak5LVVNVbVptNGt0dmd3R21ZZ09vYWNtQURrUFBzeWtLeUFZV01t\nZC9xa2xxK2pDdjBVcXl4RmlqMWhHMmI5NEZVSlVtWG1JU2IwMW83NjlzRTRt\ncUxMRTZYb3RlZlIrVytOeitoRXVqZzBrSStFTkg0UmNseVk2ekI2Q0lBSmFz\nc1V4NkxZMTdsT1hQMnR3TWhaLzlEeGxQMldzM0NiMEZISEwxZHhIUGJhQVRs\nT3FpTkYrVkQ1NWN3a3RaSGc1MzJtc0dkOWQyU1YzMGVlSEovUkNUQXJiYlB6\nUjhmckQyVU5maWYwYllGbEdVNEY3RlRXNmUwQ25YNkR4VFZVUVBsRmo0OG5p\nSnNteGdXeWJKbENXMG5aOStPNjB0SXh0eGVjcVAyMVk4UUVCMnNjTE5jL0t6\nUnNZMWJmZkhBR1YxSW8vdHQ4UHoyNWdVSnFmcnFycWhWRDZkSW9zOFQ4bmUr\nd3hENmJNVXU4R3JkaXJRdEJ3OXRrdjhIZFdySkpVR2ZnSVY1cDkvTCswdUgy\nNC9wVDBQVFo1NXVYZldwejY0WWY2ZllLbHV5Z2hIMksvWFlVd05pSWJqNjBj\nWEd3dU9mTm40anV6cG9mRHRkdUpCazIvdVhaZ1JDZ0hQSTZnbmJVWkRIaXE2\nR294aEtaQmlpTjR3OSthbDJVSUpRMm5Hdno3M1hKSExIRUI3N1BwbElVWmcw\neFVtVXpmdVF2MkZjUkhxem11djlDV3FHeS9aSWhDbXpVajFmRVB1ME9wbTB4\nd29YbGZKV0dGMUNxOWRJcExuWlhkOWJoQ2ZOMWo2K25ad01oeHJhTHlLOFdS\nOXBFZzBndXZibGg5c2VOa2txZEExWndBZ0xDdEQwMGRGRGJQUjRKZzJZUGd4\na2pWMFFQOEc5V3o0dTlRZ0ZzRFFxZ0phWXdqQlVPS1hWY3BwdFlrTzMwWkZF\nbXhVR0JXclh5QndzYWo0STJNOURXZVEvNGZiTVlZK0lZVThLdUg2U0dUMmta\nc2tWcG0rVkFOeGlBK3o0LzV5MXgrV1hmNzVVRzB2TkZ5ZTExSGUra0VNejRu\nTktGRERVa1NPWVNva1oxdTBrdGNmS2NnK2tQUUNJdlI5dW9ZcW1sVE9Ha20w\nbURpQTE3TVF3Snl4SWZMZmtiSjg2S0tQUnoxM1Z6MktLSDRKZXNVSjZIeUdn\nWEdZLnFOWEh3bDRqdDYxTzg1VzUuTHRXTDBDZ2VtbjlKTlNxNDV2STVjdz09\nIiwic2lnIjoiSDBKeXJ1VFlYWnRnRXBFdWNwby9abG9hRlRERDFoSEMrVHN3\nY3ZzSjdsUXg5K3BJTHd1enpYT0hINFZmLzE2cGpkTlV4V1p6WnYvQk9NRXpX\nUkptQkE9PSIsImFsZyI6ImFlcy0yNTYtZ2NtK2VkMjU1MTkifQ==\n-----END MACHINE FILE-----\n",
      "algorithm": "base64+ed25519",
      "includes": [],
      "ttl": 2629746,
      "expiry": "2022-04-28T19:17:21.503Z",
      "issued": "2022-03-28T19:17:21.503Z"
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
      "license": {
        "links": {
          "related": "/v1/accounts/1fddcec8-8dd3-4d8d-9b16-215cac0f9b52/licenses/f5a618af-7076-407c-93bc-495caafa65c2"
        },
        "data": {
          "type": "licenses",
          "id": "f5a618af-7076-407c-93bc-495caafa65c2"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/1fddcec8-8dd3-4d8d-9b16-215cac0f9b52/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
        },
        "data": {
          "type": "machines",
          "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
        }
      }
    }
  }
}
{
  "data": {
    "id": "0c5becb0-7beb-4542-94f0-0f80d7f682fd",
    "type": "machine-files",
    "attributes": {
      "certificate": "-----BEGIN MACHINE FILE-----\neyJlbmMiOiJBeG9tVFNncER6M1JPbVh1RUJiRHNtZ2VrVmJObzcyWktRNi9V\ndFpnS0N0RnRzR1dZckx6M2tjREN4V0hrYWRCSkV0ZWJpU0wrbXNoL2QvZmNN\nMnZrd2I2aUF6ekgrNFFndFpOb3VRN2M2SE5jbXFBcHFHZkhoSzdsZ2QvdjAr\nL2M5SWgxVHlQZkd0RTlGQzZtbi9KelNhOGVOejdWb1VXRmxXTjNQZHQxejht\ncm5OQ2p4U3Q4c1VUVUNzeEUvTDJpZnRBS08rZG1tVm9IYkdiQThNTjUvaHk4\nTW1XajgxUjFma2ZZMzFJbC9oY0FhZ2RkOGE0aXd1czdTQ1BqVkN6dGowQWNP\nSnM2WVJ0TzVaMFJ0VU9TYitQWXVHbzl0RERUS053RHgyT0J6K3Z5NWczWURq\nUTZOQjhIcXE4ODN4Umg1Umx5UmVYQml3eFJhb2VyL3IyeENvU3E0ZkNGTDNG\nQmFYVjNCMnYrcGIyTHJob05BaTd0L01oQ3BNdGxrY2Z3SlBpdXVVdk8yMkRj\nekhMTHFrMTF1YkZLLzhRQlN4UnVtSm1mbG5sQlYvVlFEU1Zla0pLdE8wQWZ3\nUEtyR1l6ZTExcVoxcWp2N0xFTGE2N001cjA3WFlhN3ByKzFseWV6OXpHdGxv\nbm5Hd2JVZDBTWUtuYTdkT2NqRVJkeFBpblNtdnpTdWF3T2VRSFdVdUdWZVJm\nZzJwRWl3UnVSdjhleVBTQXJyWEE1N09LRTltbkI0K083OTN3M0xhbXozdDFs\nc3p3WTRPN3Q1WjhiZXhsbGZSVkdMOTBncDdDUk1sNXhSTDUyYmU5YjdreFd0\nZC96WCtvcUVEZ3N0ZmJabmF3OFdxdUx0Z1BZSWF0aTM3ODFHQVA3QXkxdDdo\nSzNINGUyblA3QWliaFJsZDJJVGtqQXN0TzNuc01LM211czByL1EzV1QzQnpm\naEZReDRHdWJUOTRwZ1lzZEUwZ1M2Q0ZRMFVGLzlqcjJzbyt6OTAxdllTUlhI\nVDdPMHBHdnZkQ3hSNUdJMFFLK0JlYW9obVBhSXBxaUtHVGVOU3FvTHE1Q3Q2\nRDVWbUFJR2ErcGRwcWVOV0FDeC9hVlZYZEl2dGI1Z3VMczBQbVVsZzBVMUxp\nOXlzK21tNWZNalBxZVFPQ1J5S2o3UHFibVI1MGtvamxzcFRmRW42OGVLbE5D\nRFhGTG10ci9zODZqUk0zSW0wQlc1L1dSeDRoVzlxYjBvNlBvY0sxc3RFZGkx\nL3R5NXZ0Q2UyVXcrOUQrUDRoaE0wL3pQVXg2c3NBTDEwY2x0UnFDSG5lbTdr\naFFuWkgwSERrT1RCWWIzemtsMWFiMzFaMFdlV1UvU0Zoekh6ckJPS1BTVkow\nU0ErbldydmtUMXkxbGg0QmpnaHBuVWtnMmJvKzJXbldISWErdDJ6KzB2UmJP\ndGNVOWNhOGtzbmpDcHF2QkZQVitnb2VUK2pJMG9rc3Jmd3RhM2t5QlljWkto\ndUVMeFUvTENUUG9KNUFPOTNiZmF3UFlsdXJBUVpYY01PV2hjS203bEF1alF0\nWFVSNy9kR3JBVTl1NVVvSmlOdU90Ti9YZVRzMk0ydFNNNjc1cnA2TWlUQ2Vk\nQTNKeS9udVQzRVV0NWliWUtKVnFrdEpLcHlrWXdjQkxOVkFjQ093Q2g3T2d3\nbS9HT2R1RFZKUFVwUlE3SEdGM2lWSnJXRE1SbVFMcXN1UEZwbzh3dGJEKzln\ndXdkUE5nWHhFdUltUFd2OENtbWVvK0VuSGJmaVhYeUZsRjd3VmNPZTZMNERj\nNVJmdGpxdzVzNGE4Y2R3R2JIQXJUYXJ6K3c1Z1JyU0MvdUZ2S1QySEEveFkr\nN2QyTUVPa2FJQXVSTGJkQ3gweCttMC94Qm9CczhNWSt1TzVpaUZEbGFlcExF\nU1N1bnlScEk3OHRBSVRJMERVcW5iSzZYL2NPSFJwVkNQQXRmTyswVjZ5RXFj\nai9QczRaMkoyaWE2dXBTOFd0bGRaWjlYNWJWWjBNOXpqcWw1SFQwZ0hVZGx2\nd3hQaTJUNnJ0Tk8vZmorZ0hrTG9SWUg0NG9rVkw2bjVaTFpDR0g5NU40UFFX\nYW9OZFAvQ0QyZGh5Ty9mKy9FK1p3K0xmTGZlN1JhWnZYQ1hRQ3ZHMXZ4d0lT\nNkROKzBwZGxjWVR3aFlNYVRzdG9yOVBzWXpzdy9UUzhDZVhZeDBHM3RsMEI5\nT0htV0lSSjczenpma1BQaWIwKzNQWmRlcjR3UnkzMWpYeDBsL1cwQ0lUUldo\nVERuVjIvTVhLMUw3cUJhRDM5WDJndHkvUXlZNjBRd0Q5OTVDQlE4R1J6V1Q3\nOHpNSjUvdFRRWVN3eHozVkhYZjZVWXdPcjQwa2x1VlZ2YU1WSmNsLzlsaG9i\na1JZd3BYZ3I0VFplYy9QTEJkSmhXa2xYQVZjYW5xU01IM1FaV2tGTkIzdjJJ\nQTBMQWhCMklFdjQ1cUI5bGRXNXVaRGRHQ0VDbjhsQVlDNXppb0xtQmg5bVZz\nYlFTYWlCc1U4elZVL2RlM1ZmOS9uRGU0Wng0SGdTczN1R3NHNmhlV05INTI5\nR3VHY1NieWE1ek1PRzI4LzRRdFN4QURDMTFPalRiNm9IS1RLMHBoMFNhOUR0\nNlFiSXdOeHNiOFcrMmNsUGtDblBlNkNwNVBHMlZpeUVqQnJrc2hGbUN4S255\nalVnbkJHN1RHZ05WZE9jZWJBVWF1QWdFME42UHgwQUFxSXBxY0lMbncyWWs1\nVzQxVnpvUFU5bjBHNjBySUkyZUtQK1U4SVRidWUzMk5Sd2tJSTN5djEvdEVm\nbkwwdmt0NTFSMkcrVU1rUU9vUy9nSGx2UHVGc1VWY0FXdVNuR1M3d2ljTnN0\nbUpHUWtROGdLTUcwV3BpOXMrd1pVd2xQaDkvMGxmSFI4QWRML1VIT2h0Rkgz\naHNKbnYrcFZUcXdXc09hblhnSXFXcC9NKzJjaVBNZVpoZ3RiRVNJdWpMclV5\nZ3Z6NW5WZjhLWWNReGlzeFU5NVY4YU01ZGhzdjNWVlFURjM5RnlnSy9XbDFU\nSjVQamdWcmI1SmVsV0d0ZGVSbjh6ZkR5enZPdnBySy9hT2ludjg0VGJwbm91\nT0pGejVacHlBYWJYbkxRTkFGSXJtNmRNZlJFRTllN1hjZHhsc0hBNW5aTWhq\nWEk1aURFRXlVSkR2eVJlOHpjOGxGNGNMQWZxZUN6VjByVzh4enZnU2RyZERp\nWk5Ya2dxRnNJajVianZUK3NXZzJFeExwZnQrODNJSW9LaVE2djJ2SzBiQk9O\nRDBYb25weFRLV3BnVCtVMGx4amxQV3E1M1NXNjcyWGkycEtwRTBQdUYxWUlh\nZDZLSFA2ajR4NXRqdEgrMUIxZ3ZiQU1xbFZ6KzJ6V1lGZVl4cFBlRXBXSHpZ\nd2Rpemg0Q290Y29NemxZbWQ3TmNMczNrSU5iVEh5WVYxSkRKNmJBbEpWZGlu\nSGhGck9VeU0vS3BJTkU2ZWxabkhVbkNHWjgwcFdWLzM5d3EyR1JrREpVM0pp\nVDduTCsrQ2pMVTZJRVJiNkNuN3N0dE5Yd0cvTHRnM3VWR3VFaU5hVXpZQnBE\nVjdmT3RDNkRGS24zK3ZlRlFwbTI3K29GRGhWMjZXdnlJb2VlNGc4N2Y4ZTNo\ndzNKTXFZbThFUG5DU3VoNEVDZ2Y5Nm1sZkt1aEViYmQzd1pQaC90YVREWnI5\nQ20ycTVOVlViSFBCajdtaEtvdDV6MjdYNWRJSmFqbjZYUjBSL1MyNkd2OVpl\nK29NKzFRZEVOOUNxVTU1a2VNb01hWXdGcGlXU2dIWHJjS2hoZGVBVjJWc29D\nUWpRZzRKeUxPY3dFNHBDeWVzWi9MRWZMM2xkaGd0emlxRmt3V0k4ZzR2N2k0\nWVdlK0JoWitpK280N2E1bjhMZWdiU2JKaHFPZTNNd3JQdjh0Z21mSGJhNnJu\nVGxaYzBWT0FxTzE3dEpTWU9BdTZkeG9mQk9BOXQwVDVwVitPSnRlYWRGOVN5\nN3d1SUNncVkzYWhQYVVjWnF0TEtGdWY4c0wrVEkyVFdWYWJ3VDBBQXM0WG1a\ndk16elhxUVIxazMvTys1RTlKbnJESGM3RGJkd1NySHF5OEtsSk5JSm1FZHNr\nVk5TYXI4L1JIMXVkSHdoNjlzbjhiL0hDTTlJUGtwT3lFcWRCR2xxUmpvZXdT\nOVh4dGpudGhYUDNXaDZZbVhlMkNWU08zWEo0UGFobTBlYWphOWpRdklFSWZK\nallRVHY3Z2NnU0N5NUluUEc0VFFiYmZ4b2VnRkZ0bFh4MVBBWnprRzNUcWc3\nTTVidURVNHF3UE5UYWFieWNhbXd6cDVvUmxJNGJ6K0k1WkpYSnZoNC84cWF5\nMjlNN2ZleGVtMmprcEhEdElmSlNKcFhYTERFT0h6Y1FFZmo4Si85WXBybGsx\nTGgrYWpvZ2JkQnJ2dFB3dXFEUjNKeXBaZ1NjNzNnVEV0S1dMOVRYTWJHV3J3\nOW5wZTFlL3hTV1B5TkNRK3VRUEh1Sml0UlRnOGQ5WmZFeGpMd2lSemJFNjhn\nS3FESGhseDJiemNBN0FkSy9zc2JyR1NFeDgzK21ib1VLT1FXVWtMTmlsUS9x\nN3hXT29reWUyN2VQKzJRSHp3N3NwWlVsSmpEeVdsWU4ycUc5cWcvR201dk9R\nbWJseFMrTG9CRE0wYUtpTEpCTU85ZkpqQ1pJYmsyRVR2b3pzVk8yb1RmKzVl\neWl6OGhsT3lHZzFNek9PR3J5ZlR0VXIyMFMyYlU3TDRuSXUwdVFoMXB4Q2Ni\nTWZhVUlneXI0RG5HS2QxUEtQekdTaDlpbmtjVExlSllsK2o5bWZzMzQwWXpH\nWEV5L0ZhZ3Axc2hyOHJlSlFVL0IzOGNMZmdXZWwvOFBpS1ZJZ2xiaXFzRklz\ndkcrQys0UGxNTTkwUW1ueHowUjd3b1Z2ckk5R1ZRd25LL1QzQ3NqMHJVNkdT\nazVPc1d3dmlNdzVabjI2UlNSQmc3c2VldnJzUlZEend6ZjE4RzJpNkxkQWFj\nb0VBb2RaZzNkNE5Sb0MwckNoK3ZyUTJ1emVteXNpMDhidDlsUnpYdCtEbTRY\nOHJ5ZldNak5LVVNVbVptNGt0dmd3R21ZZ09vYWNtQURrUFBzeWtLeUFZV01t\nZC9xa2xxK2pDdjBVcXl4RmlqMWhHMmI5NEZVSlVtWG1JU2IwMW83NjlzRTRt\ncUxMRTZYb3RlZlIrVytOeitoRXVqZzBrSStFTkg0UmNseVk2ekI2Q0lBSmFz\nc1V4NkxZMTdsT1hQMnR3TWhaLzlEeGxQMldzM0NiMEZISEwxZHhIUGJhQVRs\nT3FpTkYrVkQ1NWN3a3RaSGc1MzJtc0dkOWQyU1YzMGVlSEovUkNUQXJiYlB6\nUjhmckQyVU5maWYwYllGbEdVNEY3RlRXNmUwQ25YNkR4VFZVUVBsRmo0OG5p\nSnNteGdXeWJKbENXMG5aOStPNjB0SXh0eGVjcVAyMVk4UUVCMnNjTE5jL0t6\nUnNZMWJmZkhBR1YxSW8vdHQ4UHoyNWdVSnFmcnFycWhWRDZkSW9zOFQ4bmUr\nd3hENmJNVXU4R3JkaXJRdEJ3OXRrdjhIZFdySkpVR2ZnSVY1cDkvTCswdUgy\nNC9wVDBQVFo1NXVYZldwejY0WWY2ZllLbHV5Z2hIMksvWFlVd05pSWJqNjBj\nWEd3dU9mTm40anV6cG9mRHRkdUpCazIvdVhaZ1JDZ0hQSTZnbmJVWkRIaXE2\nR294aEtaQmlpTjR3OSthbDJVSUpRMm5Hdno3M1hKSExIRUI3N1BwbElVWmcw\neFVtVXpmdVF2MkZjUkhxem11djlDV3FHeS9aSWhDbXpVajFmRVB1ME9wbTB4\nd29YbGZKV0dGMUNxOWRJcExuWlhkOWJoQ2ZOMWo2K25ad01oeHJhTHlLOFdS\nOXBFZzBndXZibGg5c2VOa2txZEExWndBZ0xDdEQwMGRGRGJQUjRKZzJZUGd4\na2pWMFFQOEc5V3o0dTlRZ0ZzRFFxZ0phWXdqQlVPS1hWY3BwdFlrTzMwWkZF\nbXhVR0JXclh5QndzYWo0STJNOURXZVEvNGZiTVlZK0lZVThLdUg2U0dUMmta\nc2tWcG0rVkFOeGlBK3o0LzV5MXgrV1hmNzVVRzB2TkZ5ZTExSGUra0VNejRu\nTktGRERVa1NPWVNva1oxdTBrdGNmS2NnK2tQUUNJdlI5dW9ZcW1sVE9Ha20w\nbURpQTE3TVF3Snl4SWZMZmtiSjg2S0tQUnoxM1Z6MktLSDRKZXNVSjZIeUdn\nWEdZLnFOWEh3bDRqdDYxTzg1VzUuTHRXTDBDZ2VtbjlKTlNxNDV2STVjdz09\nIiwic2lnIjoiSDBKeXJ1VFlYWnRnRXBFdWNwby9abG9hRlRERDFoSEMrVHN3\nY3ZzSjdsUXg5K3BJTHd1enpYT0hINFZmLzE2cGpkTlV4V1p6WnYvQk9NRXpX\nUkptQkE9PSIsImFsZyI6ImFlcy0yNTYtZ2NtK2VkMjU1MTkifQ==\n-----END MACHINE FILE-----\n",
      "algorithm": "base64+ed25519",
      "includes": [],
      "ttl": 2629746,
      "expiry": "2022-04-28T19:17:21.503Z",
      "issued": "2022-03-28T19:17:21.503Z"
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
      "license": {
        "links": {
          "related": "/v1/accounts/1fddcec8-8dd3-4d8d-9b16-215cac0f9b52/licenses/f5a618af-7076-407c-93bc-495caafa65c2"
        },
        "data": {
          "type": "licenses",
          "id": "f5a618af-7076-407c-93bc-495caafa65c2"
        }
      },
      "machine": {
        "links": {
          "related": "/v1/accounts/1fddcec8-8dd3-4d8d-9b16-215cac0f9b52/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
        },
        "data": {
          "type": "machines",
          "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/machines/\#machines-actions-ping) Ping heartbeat

Action to begin or maintain a machine heartbeat monitor. When a machine has not performed a
heartbeat ping within the monitor window, it will automatically be deactivated. This can be
utilized for machine leasing, where a license has a limited number of machines allowed, and
each machine must maintain heartbeat pings in order to remain active.

To illustrate further, consider a rather common scenario when dealing with leasing VMs:

1. The machine is activated for a new device using a unique VM GUID as a "fingerprint."
2. The machine sends their first heartbeat ping, starting the monitor.
3. The machine sends further heartbeat pings, within the heartbeat monitor window, to indicate
that it is still alive.
4. The machine/software crashes. Normal machine deactivation fails to occur before the software
program exits. This is now a "zombie" machine.
5. The heartbeat monitor detects that the machine has not sent a ping within the window, and
subsequently deactivates the machine.

**The default heartbeat monitor window is 10 minutes from time of last ping.** This can be
configured via the license policy's `heartbeatDuration` attribute.

Machines will be culled according to the policy's heartbeat cull strategy, after the machine's
resurrection period has passed, if set. Dead machines are culled every 2 minutes.

**Once a machine heartbeat monitor has been started, it must be maintained.** The machine
will automatically be deactivated (i.e. deleted) if it does not maintain a ping frequency.
Please see the [reset heartbeat action](https://keygen.sh/docs/api/machines/#machines-actions-reset), which can be
used to reset and disable a heartbeat monitor for a given machine.

### [_link_](https://keygen.sh/docs/api/machines/\#machines-ping-permissions) Required permissions

- machine.heartbeat.ping

### [_link_](https://keygen.sh/docs/api/machines/\#machines-ping-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-ping-auths-bearer) Bearer

required



An authentication token with privileges to ping the resource's heartbeat: either an admin, the product it belongs to, the machine's license (via license key or a license token), or the user it belongs to.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-ping-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-ping-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-ping-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe fingerprint of the machine to ping.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-ping-returns) Returns

A `200 OK` response will be returned along with the pinged machine object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/machines/<id>/actions/ping
https://api.keygen.sh/v1/accounts/<account>/machines/<id>/actions/ping
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping", {
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
  "https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping",
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
  "machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping")
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

req.set_request_uri("/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping");
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

req.set_request_uri("/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/ping \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": true,
      "heartbeatStatus": "ALIVE",
      "heartbeatDuration": 600,
      "lastHeartbeat": "2019-05-28T15:38:02.927Z",
      "nextHeartbeat": "2019-05-28T15:48:02.927Z",
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": true,
      "heartbeatStatus": "ALIVE",
      "heartbeatDuration": 600,
      "lastHeartbeat": "2019-05-28T15:38:02.927Z",
      "nextHeartbeat": "2019-05-28T15:48:02.927Z",
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/machines/\#machines-actions-reset) Reset heartbeat

Action to reset and stop the machine's heartbeat monitor. This will not deactivate the machine.

### [_link_](https://keygen.sh/docs/api/machines/\#machines-reset-permissions) Required permissions

- machine.heartbeat.reset

### [_link_](https://keygen.sh/docs/api/machines/\#machines-reset-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-reset-auths-bearer) Bearer

required



An authentication token with privileges to reset the resource's heartbeat: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-reset-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-reset-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-reset-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe fingerprint of the machine to reset.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-reset-returns) Returns

A `200 OK` response will be returned along with the reset machine object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/machines/<id>/actions/reset
https://api.keygen.sh/v1/accounts/<account>/machines/<id>/actions/reset
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset", {
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
  "https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset",
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
  "machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset")
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

req.set_request_uri("/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset");
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

req.set_request_uri("/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/actions/reset \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/machines/\#machines-relationships) Machine relationships

Relationship endpoints for the machine resource.

### [_link_](https://keygen.sh/docs/api/machines/\#machines-relationships-change-owner) Change owner

Change a machine's owner relationship. This will immediately transfer the machine
resource to the new owner.

### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-owner-permissions) Required permissions

- machine.owner.update

### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-owner-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-owner-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product the machine belongs to.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-owner-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-owner-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-owner-params-id) <id>

stringrequired



The identifier (UUID) or key of the machine to be updated.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-owner-returns) Returns

A `200 OK` response will be returned along with the updated machine object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/machines/<id>/owner
https://api.keygen.sh/v1/accounts/<account>/machines/<id>/owner
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner", {
  method: "PUT",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "users",
      "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner", {
  method: "PUT",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "users",
      "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.put(
  "https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "users",
      "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  })
).json()
import requests
import json

res = requests.put(
  "https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "users",
      "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner",
  method: .put,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "users",\
      "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner",
  method: .put,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "users",\
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
  "machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner",
  Method.PUT
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "users",
    id = "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner",
  Method.PUT
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "users",
    id = "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "users",
    "id" to "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
  )
))

val res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner")
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
    "id" to "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
  )
))

val res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner")
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
    entry("id", "db7e99e1-dd6d-447b-98e8-ceb354d9d85d")
  ))
));

HttpResponse<JsonNode> res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner")
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
    entry("id", "db7e99e1-dd6d-447b-98e8-ceb354d9d85d")
  ))
));

HttpResponse<JsonNode> res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner")
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
data["type"] = value::string("users");
data["id"] = value::string("db7e99e1-dd6d-447b-98e8-ceb354d9d85d");

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner");
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
data["type"] = value::string("users");
data["id"] = value::string("db7e99e1-dd6d-447b-98e8-ceb354d9d85d");

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner");
req.set_method(methods::PUT);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PUT https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "users",
          "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
        }
      }'
curl -X PUT https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "users",
          "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": {
          "type": "groups",
          "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
        }
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": {
          "type": "groups",
          "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
        }
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}

content_copy
```

### [_link_](https://keygen.sh/docs/api/machines/\#machines-relationships-change-group) Change group

Change a machine's group relationship. This will immediately transfer the machine
resource to the new group. Changing the machine's group will not retroactively
change the group of its user or license.

### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-group-permissions) Required permissions

- machine.group.update

### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-group-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-group-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product the machine belongs to.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-group-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-group-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-group-params-id) <id>

stringrequired



The identifier (UUID) or key of the machine to be updated.


### [_link_](https://keygen.sh/docs/api/machines/\#machines-change-group-returns) Returns

A `200 OK` response will be returned along with the updated machine object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/machines/<id>/group
https://api.keygen.sh/v1/accounts/<account>/machines/<id>/group
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group", {
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

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group", {
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
  "https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group",
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
  "https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group",
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
  "machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group",
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
  "machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group",
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

val res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group")
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

val res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group")
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

HttpResponse<JsonNode> res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group")
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

HttpResponse<JsonNode> res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group")
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

req.set_request_uri("/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group");
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

req.set_request_uri("/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group");
req.set_method(methods::PUT);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PUT https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "groups",
          "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
        }
      }'
curl -X PUT https://api.keygen.sh/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group \
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
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": {
          "type": "groups",
          "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
        }
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
        }
      }
    }
  }
}
{
  "data": {
    "id": "9c4c90c8-d4d3-4571-9363-4c7b0332a6a4",
    "type": "machines",
    "links": {
      "self": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4"
    },
    "attributes": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC",
      "cores": null,
      "memory": null,
      "disk": null,
      "ip": null,
      "hostname": null,
      "platform": "macOS",
      "name": "Office MacBook Pro",
      "maxProcesses": null,
      "requireHeartbeat": false,
      "heartbeatStatus": "NOT_STARTED",
      "heartbeatDuration": 600,
      "lastHeartbeat": null,
      "nextHeartbeat": null,
      "lastCheckOut": null,
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
      "product": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/product"
        },
        "data": {
          "type": "products",
          "id": "22b78db6-6a2e-4a7f-9369-157976148c4c"
        }
      },
      "license": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/license"
        },
        "data": {
          "type": "licenses",
          "id": "4097d726-6cc5-4156-8575-3a96387e19b4"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/group"
        },
        "data": {
          "type": "groups",
          "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
        }
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/owner"
        },
        "data": {
          "type": "users",
          "id": "15ad7012-b570-48b7-88c1-fbab68be9d05"
        }
      },
      "components": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/components"
        }
      },
      "processes": {
        "links": {
          "related": "/v1/accounts/<account>/machines/9c4c90c8-d4d3-4571-9363-4c7b0332a6a4/processes"
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