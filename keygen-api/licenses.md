# [_link_](https://keygen.sh/docs/api/licenses/\#licenses) Licenses

#### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-toc) Table of contents

01. [The license object](https://keygen.sh/docs/api/licenses/#licenses-object)
02. [Create a license](https://keygen.sh/docs/api/licenses/#licenses-create)
03. [Retrieve a license](https://keygen.sh/docs/api/licenses/#licenses-retrieve)
04. [Update a license](https://keygen.sh/docs/api/licenses/#licenses-update)
05. [Delete a license](https://keygen.sh/docs/api/licenses/#licenses-delete)
06. [List all licenses](https://keygen.sh/docs/api/licenses/#licenses-list)
07. [Validate by license ID](https://keygen.sh/docs/api/licenses/#licenses-actions-validate)
08. [Validate by key](https://keygen.sh/docs/api/licenses/#licenses-actions-validate-key)
09. [Suspend license](https://keygen.sh/docs/api/licenses/#licenses-actions-suspend)
10. [Reinstate license](https://keygen.sh/docs/api/licenses/#licenses-actions-reinstate)
11. [Renew license](https://keygen.sh/docs/api/licenses/#licenses-actions-renew)
12. [Revoke license](https://keygen.sh/docs/api/licenses/#licenses-actions-revoke)
13. [Check-out license](https://keygen.sh/docs/api/licenses/#licenses-actions-check-out)
14. [Check-in license](https://keygen.sh/docs/api/licenses/#licenses-actions-check-in)
15. [Increment usage](https://keygen.sh/docs/api/licenses/#licenses-actions-increment-usage)
16. [Decrement usage](https://keygen.sh/docs/api/licenses/#licenses-actions-decrement-usage)
17. [Reset usage](https://keygen.sh/docs/api/licenses/#licenses-actions-reset-usage)
18. [Generate license token](https://keygen.sh/docs/api/licenses/#licenses-relationships-activation-tokens)
19. [Attach users](https://keygen.sh/docs/api/licenses/#licenses-relationships-attach-users)
20. [Detach users](https://keygen.sh/docs/api/licenses/#licenses-relationships-detach-users)
21. [List users](https://keygen.sh/docs/api/licenses/#licenses-relationships-list-users)
22. [Attach entitlements](https://keygen.sh/docs/api/licenses/#licenses-relationships-attach-entitlements)
23. [Detach entitlements](https://keygen.sh/docs/api/licenses/#licenses-relationships-detach-entitlements)
24. [List entitlements](https://keygen.sh/docs/api/licenses/#licenses-relationships-list-entitlements)
25. [Change policy](https://keygen.sh/docs/api/licenses/#licenses-relationships-change-policy)
26. [Change owner](https://keygen.sh/docs/api/licenses/#licenses-relationships-change-owner)
27. [Change group](https://keygen.sh/docs/api/licenses/#licenses-relationships-change-group)

## [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object) The license object

Below you will find the various attributes for the license resource, as well
as the license resource's relationships. A license is an implementation of
a product's policy.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-name) data.attributes.name

string



The name of the license. This can be used to distinguish licenses from each other.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-key) data.attributes.key

stringdefault=auto-generated



A unique pre-determined key for the license. License keys are immutable values. Cannot be used on legacy encrypted licenses. This attribute will be automatically generated or popped from the remaining pool if left blank and the chosen scheme supports auto-generated keys. Depending on the policy's [cryptographic scheme](https://keygen.sh/docs/api/cryptography/#cryptographic-keys) (if any), the key attribute may be required for a 'seed' dataset to embed into the final key, and the key may have other requirements that must be met regarding dataset length and formatting. The key and its signature may be [`base64url` encoded](https://keygen.sh/docs/api/signatures/), depending on the chosen scheme.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-expiry) data.attributes.expiry

timestamp (iso8601)



When the license will expire. Calculated from the license's policy, i.e. `time.now + policy.duration`, at the time of creation and/or renewal.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-status) data.attributes.status

stringread only



The license's status, for filtering purposes and to ascertain overall status at-a-glance. An active license is a license that has been created, validated, checked out, or checked in within the last 90 days. An expiring license is a license that is expiring within the next 3 days. One of: `ACTIVE`, `INACTIVE`, `EXPIRING`, `EXPIRED`, `SUSPENDED`, or `BANNED`.



**This is not a replacement for license validation or a representation of a license's validity.** This is for status at-a-glance, but does not supplement or replace [license validation](https://keygen.sh/docs/api/licenses/#licenses-actions-validate). It has no effect on whether or not the license can authenticate, or make requests, or be used.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-uses) data.attributes.uses

integerdefault=0



The license's current usage count. This can be incremented, decremented, or reset using the license's usage-related actions. Cannot exceed `2,147,483,647`, which is the maximum value of a 4 byte integer.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-protected) data.attributes.protected

booleandefault=inherited



Whether or not the license is protected. A protected license disallows users the ability to activate and manage machines themselves, useful in situations where you want to allow machine creation for a protected account or policy. If the license's policy is protected, they automatically inherit that value when left blank.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-version) data.attributes.version

semverread only



The license's last validated release version.



To set the license's version, supply a `scope.version` or `scope.checksum` scope during license validation. By default, all release artifacts uploaded via [our CLI](https://keygen.sh/docs/cli/) will have a SHA-512 checksum.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-suspended) data.attributes.suspended

boolean



Whether or not the license is suspended. A suspended license will always fail validation.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-floating) data.attributes.floating

booleanread only



Whether or not the license is floating. This is inherited from the policy.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-scheme) data.attributes.scheme

stringread only



The cryptographic encryption/signature scheme used on the license's key. Can be used to implement offline licensing by securely storing arbitrary data within a license's key.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-strict) data.attributes.strict

booleanread only



Whether or not the license is strict. This is inherited from the policy.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-maxMachines) data.attributes.maxMachines

integer



The maximum number of machines the license can have associated with it. This is by default inherited from the policy, but can be overridden on a per-license basis.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-maxProcesses) data.attributes.maxProcesses

integer



The maximum number of machine processes the license can have associated with it. This is by default inherited from the policy, but can be overridden on a per-license basis.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-maxUsers) data.attributes.maxUsers

integer



The maximum number of users the license can have associated with it. This is by default inherited from the policy, but can be overridden on a per-license basis.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-maxCores) data.attributes.maxCores

integer



The maximum number of machine CPU cores the license can have associated with it. The count is the sum of all cores for a license's machines. This is by default inherited from the policy, but can be overridden on a per-license basis.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-maxMemory) data.attributes.maxMemory

integer



The maximum amount of machine memory, in bytes, the license can have associated with it. The count is the sum of all memory across a license's machines. This is by default inherited from the policy, but can be overridden on a per-license basis.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-maxDisk) data.attributes.maxDisk

integer



The maximum amount of machine disk, in bytes, the license can have associated with it. The count is the sum of all disk across a license's machines. This is by default inherited from the policy, but can be overridden on a per-license basis.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-maxUses) data.attributes.maxUses

integer



The maximum number of uses the license is allowed to have. This is by default inherited from the policy, but can be overridden on a per-license basis.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-requireHeartbeat) data.attributes.requireHeartbeat

booleanread only



Whether or not machines require heartbeat pings. This is inherited from the policy.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-requireCheckIn) data.attributes.requireCheckIn

booleanread only



Whether or not the license will require check-in at a predefined interval to continue to pass validation i.e. if a license misses a check-in, it will be invalidated. This is inherited from the policy.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-lastValidated) data.attributes.lastValidated

timestamp (iso8601)read only



When the license was last validated.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-lastCheckOut) data.attributes.lastCheckOut

timestamp (iso8601)read only



When the license was last checked-out.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-lastCheckIn) data.attributes.lastCheckIn

timestamp (iso8601)read only



When the license was last checked-in. This is `null` if the policy does not require check-ins.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-nextCheckIn) data.attributes.nextCheckIn

timestamp (iso8601)read only



The time at which the license is required to check-in by. This is `null` if the policy does not require check-ins.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-permissions) data.attributes.permissions

array<string>



The permissions for the license. Default and available permissions are covered [here](https://keygen.sh/docs/api/authorization/#authorization-permissions).

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-metadata) data.attributes.metadata

object<string, any>



Object containing license [metadata](https://keygen.sh/docs/api/metadata/).

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-created) data.attributes.created

timestamp (iso8601)read only



When the license was created.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-attrs-updated) data.attributes.updated

timestamp (iso8601)read only



When the license was last updated.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-relationships-account) data.relationships.account

individual



The account that the license belongs to.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-relationships-environment) data.relationships.environment

individual



The environment that the license belongs to.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-relationships-product) data.relationships.product

individual



The product that the license is associated with.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-relationships-policy) data.relationships.policy

individual



The policy that the license implements.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-relationships-group) data.relationships.group

individualoptional



The group the license belongs to. By default, this is inherited from the license's user, if present.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-relationships-owner) data.relationships.owner

individualoptional



The user that owns the license.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-relationships-users) data.relationships.users

collection



The user that the license is associated with.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-object-relationships-machines) data.relationships.machines

collection



The machines that the license is associated with.


#### Example object

```
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 2
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 2
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create) Create a license

Creates a new license resource.

**License keys are immutable values. Once a license is created, its key cannot be changed.**
This also means that, for [signed keys](https://keygen.sh/docs/api/cryptography/#cryptographic-keys), the dataset you choose
to embed into a license key cannot be changed, and changes to the license object itself have
no effect on the embedded dataset. Please take this into account when designing your
embedded dataset, especially concerning expiration dates.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-permissions) Required permissions

- license.create

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, the product it belongs to, or if the license's policy is unprotected, the user it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-name) data.attributes.name

stringoptional



The name of the license. This can be used to distinguish licenses from each other.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-key) data.attributes.key

stringoptionaldefault=auto-generated



A unique pre-determined key for the license. Must be at least 8 characters. License keys are immutable values. This attribute will be automatically generated or popped from the remaining pool if left blank and the chosen scheme supports auto-generated keys. Depending on the policy's [cryptographic scheme](https://keygen.sh/docs/api/cryptography/#cryptographic-keys) (if any), the key attribute may be required for a 'seed' dataset to embed into the final key, and the key may have other requirements that must be met regarding dataset length and formatting.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-expiry) data.attributes.expiry

timestamp (iso8601)optionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



When the license will expire. When left blank, this will automatically be calculated based on the license's policy, i.e. `time.now + policy.duration`.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-maxMachines) data.attributes.maxMachines

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum number of machines the license can have associated with it. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-maxProcesses) data.attributes.maxProcesses

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum number of machine processes the license can have associated with it. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-maxUsers) data.attributes.maxUsers

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum number of users the license can have associated with it. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-maxCores) data.attributes.maxCores

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum number of machine CPU cores the license can have associated with it. The count is the sum of all cores for a license's machines. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-maxMemory) data.attributes.maxMemory

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum amount of machine memory, in bytes, the license can have associated with it. The count is the sum of all memory across a license's machines. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-maxDisk) data.attributes.maxDisk

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum amount of machine disk, in bytes, the license can have associated with it. The count is the sum of all disk across a license's machines. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-maxUses) data.attributes.maxUses

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum number of uses the license is allowed to have. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-protected) data.attributes.protected

booleanoptionaldefault=inheritedprotectedProtected attributes are only available for bearers with an admin, environment or product role.



Whether or not the license is protected. A protected license disallows users the ability to activate and manage machines themselves, useful in situations where you want to allow machine creation for a protected account or policy. If the license's policy is protected, they automatically inherit that value when left blank.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-suspended) data.attributes.suspended

booleanoptionaldefault=falseprotectedProtected attributes are only available for bearers with an admin, environment or product role.



Whether or not the license is suspended.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-permissions) data.attributes.permissions

array<string>



The permissions for the license. Default and available permissions are covered [here](https://keygen.sh/docs/api/authorization/#authorization-permissions).

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-attrs-metadata) data.attributes.metadata

object<string, any>optional



Object containing license [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-relationships-policy) data.relationships.policy

[linkage<policy>](https://keygen.sh/docs/api/relationships/)required



The policy to implement for the license.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-relationships-owner) data.relationships.owner

[linkage<owner>](https://keygen.sh/docs/api/relationships/)optional



The user the license belongs to. If authenticated as a user, this relationship is required and must be the authenticated user.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-relationships-group) data.relationships.group

[linkage<group>](https://keygen.sh/docs/api/relationships/)optionalprotectedProtected relationships are only available for bearers with an admin, environment or product role.



The group the license belongs to. If omitted, the group will be inherited from the license's user, if present.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-create-returns) Returns

A `201 Created` response will be returned along with the new license object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses
https://api.keygen.sh/v1/accounts/<account>/licenses
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "licenses",
      "relationships": {
        "policy": {
          "data": { "type": "policies", "id": "37b632f4-8e1e-4af9-8717-634765364628" }
        },
        "owner": {
          "data": { "type": "users", "id": "015a33dd-3aca-43a9-8786-328042cce30a" }
        }
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "licenses",
      "relationships": {
        "policy": {
          "data": { "type": "policies", "id": "37b632f4-8e1e-4af9-8717-634765364628" }
        },
        "owner": {
          "data": { "type": "users", "id": "015a33dd-3aca-43a9-8786-328042cce30a" }
        }
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "licenses",
      "relationships": {
        "policy": {
          "data": { "type": "policies", "id": "37b632f4-8e1e-4af9-8717-634765364628" }
        },
        "owner": {
          "data": { "type": "users", "id": "015a33dd-3aca-43a9-8786-328042cce30a" }
        }
      }
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "licenses",
      "relationships": {
        "policy": {
          "data": { "type": "policies", "id": "37b632f4-8e1e-4af9-8717-634765364628" }
        },
        "owner": {
          "data": { "type": "users", "id": "015a33dd-3aca-43a9-8786-328042cce30a" }
        }
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "licenses",\
      "relationships": [\
        "policy": [\
          "data": [ "type": "policies", "id": "37b632f4-8e1e-4af9-8717-634765364628" ]\
        ],\
        "user": [\
          "data": [ "type": "users", "id": "015a33dd-3aca-43a9-8786-328042cce30a" ]\
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "licenses",\
      "relationships": [\
        "policy": [\
          "data": [ "type": "policies", "id": "37b632f4-8e1e-4af9-8717-634765364628" ]\
        ],\
        "user": [\
          "data": [ "type": "users", "id": "015a33dd-3aca-43a9-8786-328042cce30a" ]\
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
var request = new RestRequest("licenses", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "licenses",
    relationships = new {
      policy = new {
        data = new { type = "policies", id = "37b632f4-8e1e-4af9-8717-634765364628" }
      },
      user = new {
        data = new { type = "users", id = "015a33dd-3aca-43a9-8786-328042cce30a" }
      }
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("licenses", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "licenses",
    relationships = new {
      policy = new {
        data = new { type = "policies", id = "37b632f4-8e1e-4af9-8717-634765364628" }
      },
      user = new {
        data = new { type = "users", id = "015a33dd-3aca-43a9-8786-328042cce30a" }
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
    "type" to "licenses",
    "relationships" to mapOf(
      "policy" to mapOf(
        "data" to mapOf("type" to "policies", "id" to "37b632f4-8e1e-4af9-8717-634765364628")
      ),
      "user" to mapOf(
        "data" to mapOf("type" to "users", "id" to "015a33dd-3aca-43a9-8786-328042cce30a")
      )
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses")
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
    "type" to "licenses",
    "relationships" to mapOf(
      "policy" to mapOf(
        "data" to mapOf("type" to "policies", "id" to "37b632f4-8e1e-4af9-8717-634765364628")
      ),
      "user" to mapOf(
        "data" to mapOf("type" to "users", "id" to "015a33dd-3aca-43a9-8786-328042cce30a")
      )
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses")
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
    entry("type", "licenses"),
    entry("relationships", ofEntries(
      entry("policy", ofEntries(
        entry("data", ofEntries(entry("type", "policies"), entry("id", "37b632f4-8e1e-4af9-8717-634765364628")))
      )),
      entry("user", ofEntries(
        entry("data", ofEntries(entry("type", "users"), entry("id", "015a33dd-3aca-43a9-8786-328042cce30a")))
      ))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses")
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
    entry("type", "licenses"),
    entry("relationships", ofEntries(
      entry("policy", ofEntries(
        entry("data", ofEntries(entry("type", "policies"), entry("id", "37b632f4-8e1e-4af9-8717-634765364628")))
      )),
      entry("user", ofEntries(
        entry("data", ofEntries(entry("type", "users"), entry("id", "015a33dd-3aca-43a9-8786-328042cce30a")))
      ))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses")
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

value policy_;
policy_["type"] = value::string("policies");
policy_["id"] = value::string("37b632f4-8e1e-4af9-8717-634765364628");

value policy;
policy["data"] = policy_;

value user_;
user_["type"] = value::string("users");
user_["id"] = value::string("015a33dd-3aca-43a9-8786-328042cce30a");

value user;
user["data"] = user_;

value rels;
rels["policy"] = policy;
rels["user"] = user;

value data;
data["type"] = value::string("licenses");
data["relationships"] = rels;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses");
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

value policy_;
policy_["type"] = value::string("policies");
policy_["id"] = value::string("37b632f4-8e1e-4af9-8717-634765364628");

value policy;
policy["data"] = policy_;

value user_;
user_["type"] = value::string("users");
user_["id"] = value::string("015a33dd-3aca-43a9-8786-328042cce30a");

value user;
user["data"] = user_;

value rels;
rels["policy"] = policy;
rels["user"] = user;

value data;
data["type"] = value::string("licenses");
data["relationships"] = rels;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "licenses",
          "relationships": {
            "policy": {
              "data": { "type": "policies", "id": "37b632f4-8e1e-4af9-8717-634765364628" }
            },
            "owner": {
              "data": { "type": "users", "id": "015a33dd-3aca-43a9-8786-328042cce30a" }
            }
          }
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "licenses",
          "relationships": {
            "policy": {
              "data": { "type": "policies", "id": "37b632f4-8e1e-4af9-8717-634765364628" }
            },
            "owner": {
              "data": { "type": "users", "id": "015a33dd-3aca-43a9-8786-328042cce30a" }
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
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": null,
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": null,
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "37b632f4-8e1e-4af9-8717-634765364628"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "015a33dd-3aca-43a9-8786-328042cce30a"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 4
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": null,
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": null,
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "37b632f4-8e1e-4af9-8717-634765364628"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "015a33dd-3aca-43a9-8786-328042cce30a"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 4
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/licenses/\#licenses-retrieve) Retrieve a license

Retrieves the details of an existing license.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-retrieve-permissions) Required permissions

- license.read

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-retrieve-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-retrieve-auths-bearer) Bearer

required



An authentication token with privileges to view the resource: either an admin, the product it belongs to, the license itself (via license key or a license token), or the user it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-retrieve-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-retrieve-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-retrieve-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe key of the license to be retrieved.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-retrieve-returns) Returns

A `200 OK` response will be returned along with a license object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b", {
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
  "https://api.keygen.sh/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b",
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
  "licenses/eef41cf5-f32e-4dab-a867-b9738d87285b",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/eef41cf5-f32e-4dab-a867-b9738d87285b",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b")
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

req.set_request_uri("/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b");
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

req.set_request_uri("/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b");
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "eef41cf5-f32e-4dab-a867-b9738d87285b",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      }
    }
  }
}
{
  "data": {
    "id": "eef41cf5-f32e-4dab-a867-b9738d87285b",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/eef41cf5-f32e-4dab-a867-b9738d87285b"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update) Update a license

Updates the specified license resource by setting the values of the parameters
passed. Any parameters not provided will be left unchanged.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-permissions) Required permissions

- license.update

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe key of the license to be updated.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs-name) data.attributes.name

stringoptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The name of the license. This can be used to distinguish licenses from each other.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs-expiry) data.attributes.expiry

timestamp (iso8601)optionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



When the license will expire. Note: updating this attribute to an expiry in the past may not emit a `license.expired` webhook event.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs-maxMachines) data.attributes.maxMachines

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum number of machines the license can have associated with it. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs-maxProcesses) data.attributes.maxProcesses

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum number of machine processes the license can have associated with it. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs-maxUsers) data.attributes.maxUsers

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum number of users the license can have associated with it. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs-maxCores) data.attributes.maxCores

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum number of machine CPU cores the license can have associated with it. The count is the sum of all cores for a license's machines. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs-maxMemory) data.attributes.maxMemory

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum amount of machine memory, in bytes, the license can have associated with it. The count is the sum of all memory across a license's machines. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs-maxDisk) data.attributes.maxDisk

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum amount of machine disk, in bytes, the license can have associated with it. The count is the sum of all disk across a license's machines. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs-maxUses) data.attributes.maxUses

integeroptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



The maximum number of uses the license is allowed to have. This is by default inherited from the policy, but can be overridden on a per-license basis. Set to `null` to remove an override.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs-protected) data.attributes.protected

booleanoptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



Whether or not the license is protected. A protected license disallows users the ability to activate and manage machines themselves, useful in situations where you want to allow machine creation for a protected account or policy. If the license's policy is protected, they automatically inherit that value when left blank.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs-suspended) data.attributes.suspended

booleanoptionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



Whether or not the license is suspended. Note: updating this attribute directly will not emit a `license.suspended` webhook event.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs-permissions) data.attributes.permissions

array<string>



The permissions for the license. Default and available permissions are covered [here](https://keygen.sh/docs/api/authorization/#authorization-permissions).

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-attrs-metadata) data.attributes.metadata

object<string, any>optionalprotectedProtected attributes are only available for bearers with an admin, environment or product role.



Object containing license [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-update-returns) Returns

A `200 OK` response will be returned along with the updated license object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "licenses",
      "attributes": {
        "expiry": "2020-01-01T00:00:00.000Z"
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "licenses",
      "attributes": {
        "expiry": "2020-01-01T00:00:00.000Z"
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "licenses",
      "attributes": {
        "expiry": "2020-01-01T00:00:00.000Z"
      }
    }
  })
).json()
import requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "licenses",
      "attributes": {
        "expiry": "2020-01-01T00:00:00.000Z"
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "licenses",\
      "attributes": [\
        "expiry": "2020-01-01T00:00:00.000Z"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "licenses",\
      "attributes": [\
        "expiry": "2020-01-01T00:00:00.000Z"\
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "licenses",
    attributes = new {
      expiry = "2020-01-01T00:00:00.000Z"
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "licenses",
    attributes = new {
      expiry = "2020-01-01T00:00:00.000Z"
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "licenses",
    "attributes" to mapOf(
      "expiry" to "2020-01-01T00:00:00.000Z"
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827")
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
    "type" to "licenses",
    "attributes" to mapOf(
      "expiry" to "2020-01-01T00:00:00.000Z"
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827")
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
    entry("type", "licenses"),
    entry("attributes", ofEntries(
      entry("expiry", "2020-01-01T00:00:00.000Z")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827")
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
    entry("type", "licenses"),
    entry("attributes", ofEntries(
      entry("expiry", "2020-01-01T00:00:00.000Z")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827")
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
attrs["expiry"] = value::string("2020-01-01T00:00:00.000Z");

value data;
data["type"] = value::string("licenses");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827");
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
attrs["expiry"] = value::string("2020-01-01T00:00:00.000Z");

value data;
data["type"] = value::string("licenses");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827");
req.set_method(methods::PATCH);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PATCH https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "licenses",
          "attributes": {
            "expiry": "2020-01-01T00:00:00.000Z"
          }
        }
      }'
curl -X PATCH https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "licenses",
          "attributes": {
            "expiry": "2020-01-01T00:00:00.000Z"
          }
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 1,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 1,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/licenses/\#licenses-delete) Delete a license

Permanently deletes a license. It cannot be undone. This action also immediately
deletes any machines that the license is associated with.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-delete-permissions) Required permissions

- license.delete

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-delete-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-delete-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, the product it belongs to, or if the license's policy is unprotected, the user it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-delete-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-delete-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-delete-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe key of the license to be deleted.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-delete-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
content_copyimport requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
import requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
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
  "licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
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

req.set_request_uri("/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065");
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

req.set_request_uri("/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065");
req.set_method(methods::DELETE);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/licenses/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 204 No Content

```
No content
No content
```

## [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list) List all licenses

Returns a list of licenses. The licenses are returned sorted by creation date,
with the most recent licenses appearing first. Resources are automatically
scoped to the authenticated bearer e.g. when authenticated as a user,
only licenses of that specific user will be listed.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-permissions) Required permissions

- license.read

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-auths-bearer) Bearer

required



An authentication token with privileges to view the resources.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-limit) limit

integerdefault=10



A limit on the number of licenses to be returned. Limit must be a number between 1 and 100.





```
/v1/accounts/<account>/licenses?limit=25
/v1/accounts/<account>/licenses?limit=25
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-page) page

object<string, integer>



Object containing page `size` and page `number`. Page size must be a number between 1 and 100.





```
/v1/accounts/<account>/licenses?page[size]=15&page[number]=2
/v1/accounts/<account>/licenses?page[size]=15&page[number]=2
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-expires) expires

object<string, any>



Object containing `in`, `before`, or `after` filters. The `in` filter queries licenses expiring within a duration, accepting a duration in seconds e.g. `2629746`, or an ISO8601 duration e.g. `30d`. The `before` and `after` filters accept an ISO8601 timestamp, querying for licenses expiring before or after the provided time, respectively. Licenses that do not expire, or those that are already expired, are excluded from results.





```
/v1/accounts/<account>/licenses?expires[in]=30d
/v1/accounts/<account>/licenses?expires[in]=30d
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-expired) expired

object<string, any>



Object containing `in`, `before`, or `after` filters. The `in` filter queries licenses that expired within a duration, accepting a duration in seconds e.g. `2629746`, or an ISO8601 duration e.g. `30d`. The `before` and `after` filters accept an ISO8601 timestamp, querying for licenses that expired before or after the provided time, respectively. Licenses that do not expire, or those that are not expired, are excluded from results.





```
/v1/accounts/<account>/licenses?expired[in]=30d
/v1/accounts/<account>/licenses?expired[in]=30d
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-activity) activity

object<string, any>



Object containing `inside`, `outside`, `before`, or `after` filters. The `inside` filter queries active licenses with activity inside a duration, accepting a duration in seconds e.g. `2629746`, or an ISO8601 duration e.g. `30d`. The `outside` filter queries inactive licenses with activity outside a duration, accepting a duration in seconds e.g. `2629746`, or an ISO8601 duration e.g. `30d`. The `before` and `after` filters accept an ISO8601 timestamp, querying for inactive or active licenses before or after the provided time, respectively.





```
/v1/accounts/<account>/licenses?activity[inside]=30d
/v1/accounts/<account>/licenses?activity[inside]=30d
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-status) status

string



The status of the license to filter by. One of: `ACTIVE`, `INACTIVE`, `EXPIRING`, `EXPIRED`, `SUSPENDED`, or `BANNED`.



**There are 3 main status codes: `ACTIVE`, `INACTIVE`, and `BANNED`. Active licenses are those with activity within the past 90 days, while inactive licenses have no activity in the past 90 days.** All licenses will fall under an active, inactive, or banned designation. There are sub-statuses like `EXPIRING` and `EXPIRED` which may take precedence over the `ACTIVE`, `INACTIVE`, or `BANNED` status, but that doesn't mean those licenses no longer have an active, inactive, or banned designation. Because of this, filtering on `ACTIVE`, `INACTIVE`, or `BANNED` **MAY** include licenses with these sub-statuses.





```
/v1/accounts/<account>/licenses?status=ACTIVE
/v1/accounts/<account>/licenses?status=ACTIVE
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-unassigned) unassigned

boolean



The user-relationship status of the license to filter by. A license without an owner and user is considered unassigned.





```
/v1/accounts/<account>/licenses?unassigned=true
/v1/accounts/<account>/licenses?unassigned=true
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-assigned) assigned

boolean



The user-relationship status of the license to filter by. A license with an owner or user is considered assigned.





```
/v1/accounts/<account>/licenses?assigned=true
/v1/accounts/<account>/licenses?assigned=true
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-activated) activated

boolean



The machine-relationship status of the license to filter by. A license with at least 1 machine is considered activated.





```
/v1/accounts/<account>/licenses?activated=true
/v1/accounts/<account>/licenses?activated=true
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-activations) activations

object<string, integer>



Object containing `eq`, `gt`, `gte`, `lt`, or `lte` filters. The filter queries licenses based on the number of activations according to the chosen comparison operator. E.g. \`eq\` queries for licenses with exactly that many activations, while \`gte\` queries for licenses with at least that many activations.





```
/v1/accounts/<account>/licenses?activations[gt]=3
/v1/accounts/<account>/licenses?activations[gt]=3
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-product) product

string



The identifier (UUID) of the product to filter by.





```
/v1/accounts/<account>/licenses?product=3ab38aae-bbf7-4846-9c32-af9d94bf5ad4
/v1/accounts/<account>/licenses?product=3ab38aae-bbf7-4846-9c32-af9d94bf5ad4
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-policy) policy

string



The identifier (UUID) of the policy to filter by.





```
/v1/accounts/<account>/licenses?policy=0b4b1a9a-e25a-4f14-a95e-d9dd378d6065
/v1/accounts/<account>/licenses?policy=0b4b1a9a-e25a-4f14-a95e-d9dd378d6065
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-owner) owner

string



The identifier (UUID) or email of the owner to filter by.





```
/v1/accounts/<account>/licenses?owner=a5a154d2-f026-40fa-bc8d-a7e3ca415298
/v1/accounts/<account>/licenses?owner=a5a154d2-f026-40fa-bc8d-a7e3ca415298
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-user) user

string



The identifier (UUID) or email of the user to filter by.





```
/v1/accounts/<account>/licenses?user=a5a154d2-f026-40fa-bc8d-a7e3ca415298
/v1/accounts/<account>/licenses?user=a5a154d2-f026-40fa-bc8d-a7e3ca415298
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-group) group

string



The identifier (UUID) of the group to filter by.





```
/v1/accounts/<account>/licenses?group=db7e99e1-dd6d-447b-98e8-ceb354d9d85d
/v1/accounts/<account>/licenses?group=db7e99e1-dd6d-447b-98e8-ceb354d9d85d
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-machine) machine

string



The identifier (UUID) of the machine to filter by.





```
/v1/accounts/<account>/licenses?machine=e4ab4f90-3203-48b3-bb33-a7377beb1d46
/v1/accounts/<account>/licenses?machine=e4ab4f90-3203-48b3-bb33-a7377beb1d46
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-query-metadata) metadata

object<string, any>



The metadata object to filter by.





```
/v1/accounts/<account>/licenses?metadata[customerId]=cust_af9d94bf5ad4
/v1/accounts/<account>/licenses?metadata[customerId]=cust_af9d94bf5ad4
```


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-returns) Returns

A `200 OK` response will be returned along with a list of license objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses
https://api.keygen.sh/v1/accounts/<account>/licenses
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses?limit=15", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses?limit=15", {
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
  "https://api.keygen.sh/v1/accounts/<account>/licenses?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/licenses?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("licenses", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("licenses", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses")
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

uri_builder uri("/licenses");
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

uri_builder uri("/licenses");
uri.append_query("limit", 15);

req.set_request_uri(uri.to_uri());
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/licenses?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/licenses?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": [\
    {\
      "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",\
      "type": "licenses",\
      "links": {\
        "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"\
      },\
      "attributes": {\
        "name": null,\
        "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",\
        "expiry": "2022-03-15T19:27:50.440Z",\
        "status": "ACTIVE",\
        "uses": 0,\
        "protected": false,\
        "version": "1.0.0",\
        "suspended": false,\
        "scheme": null,\
        "encrypted": false,\
        "floating": false,\
        "strict": false,\
        "maxMachines": 1,\
        "maxProcesses": null,\
        "maxUsers": null,\
        "maxCores": 64,\
        "maxMemory": null,\
        "maxDisk": null,\
        "maxUses": null,\
        "requireHeartbeat": false,\
        "requireCheckIn": false,\
        "lastValidated": "2021-03-15T19:27:50.440Z",\
        "lastCheckOut": null,\
        "lastCheckIn": null,\
        "nextCheckIn": null,\
        "permissions": ["license.read", "license.validate", ...],\
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
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"\
          },\
          "data": {\
            "type": "products",\
            "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"\
          }\
        },\
        "policy": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"\
          },\
          "data": {\
            "type": "policies",\
            "id": "37b632f4-8e1e-4af9-8717-634765364628"\
          }\
        },\
        "group": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"\
          },\
          "data": null\
        },\
        "owner": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"\
          },\
          "data": {\
            "type": "users",\
            "id": "015a33dd-3aca-43a9-8786-328042cce30a"\
          }\
        },\
        "users": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"\
          },\
          "meta": {\
            "count": 0\
          }\
        },\
        "machines": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"\
          },\
          "meta": {\
            "count": 1\
          }\
        },\
        "tokens": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"\
          }\
        },\
        "entitlements": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"\
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
      "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",\
      "type": "licenses",\
      "links": {\
        "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"\
      },\
      "attributes": {\
        "name": null,\
        "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",\
        "expiry": "2022-03-15T19:27:50.440Z",\
        "status": "ACTIVE",\
        "uses": 0,\
        "protected": false,\
        "version": "1.0.0",\
        "suspended": false,\
        "scheme": null,\
        "encrypted": false,\
        "floating": false,\
        "strict": false,\
        "maxMachines": 1,\
        "maxProcesses": null,\
        "maxUsers": null,\
        "maxCores": 64,\
        "maxMemory": null,\
        "maxDisk": null,\
        "maxUses": null,\
        "requireHeartbeat": false,\
        "requireCheckIn": false,\
        "lastValidated": "2021-03-15T19:27:50.440Z",\
        "lastCheckOut": null,\
        "lastCheckIn": null,\
        "nextCheckIn": null,\
        "permissions": ["license.read", "license.validate", ...],\
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
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"\
          },\
          "data": {\
            "type": "products",\
            "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"\
          }\
        },\
        "policy": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"\
          },\
          "data": {\
            "type": "policies",\
            "id": "37b632f4-8e1e-4af9-8717-634765364628"\
          }\
        },\
        "group": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"\
          },\
          "data": null\
        },\
        "owner": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"\
          },\
          "data": {\
            "type": "users",\
            "id": "015a33dd-3aca-43a9-8786-328042cce30a"\
          }\
        },\
        "users": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"\
          },\
          "meta": {\
            "count": 0\
          }\
        },\
        "machines": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"\
          },\
          "meta": {\
            "count": 1\
          }\
        },\
        "tokens": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"\
          }\
        },\
        "entitlements": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"\
          }\
        }\
      }\
    },\
    …\
  ]
}content_copy
```

## [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions) License actions

Actions for the license resource.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions-validate) Validate by license ID

Action to validate a license. This will check the following: if the license is
suspended, if the license is expired, if the license is overdue for check-in,
and if the license meets its machine requirements (if [strict](https://keygen.sh/docs/api/policies/#policies-object-attrs-strict)).

Additional scopes can also be applied, and may be required by the license's
policy, e.g. a policy may set `requireFingerprintScope=true`, which will
require that you specify a `scope.fingerprint` within the validation request
in order to pass validation.

The scoping feature allows you to easily set up a node-locked or floating
licensing model without additional logic on your end.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions-validate-codes) Validation codes

Below are the possible values for the `meta.code` key within the validation response.
This can be used to better communicate failures to end-users and to handle specific
failures within your application code.

| Code | Meaning |
| --- | --- |
| `VALID` | The validated license resource or license key is valid. |
| `SUSPENDED` | The validated license has been suspended. |
| `EXPIRED` | The validated license is expired. |
| `OVERDUE` | The validated license is overdue for check-in. |
| `NO_MACHINE` | Not activated. The validated license does not meet its node-locked policy's requirement of exactly 1 associated machine. |
| `NO_MACHINES` | Not activated. The validated license does not meet its floating policy's requirement of at least 1 associated machine. |
| `TOO_MANY_MACHINES` | The validated license has exceeded its policy's machine limit. |
| `TOO_MANY_CORES` | The validated license has exceeded its policy's machine core limit. |
| `TOO_MUCH_MEMORY` | The validated license has exceeded its policy's machine memory limit. |
| `TOO_MUCH_DISK` | The validated license has exceeded its policy's machine disk limit. |
| `TOO_MANY_PROCESSES` | The validated license has exceeded its policy's machine process limit. |
| `FINGERPRINT_SCOPE_REQUIRED` | The validated license requires a fingerprint scope to be provided during validation. |
| `FINGERPRINT_SCOPE_MISMATCH` | Not activated. None or not enough of the validated license's machine relationships match the provided machine fingerprint scope. |
| `FINGERPRINT_SCOPE_EMPTY` | A fingerprint scope was supplied but it has an empty or `null` value. |
| `COMPONENTS_SCOPE_REQUIRED` | The validated license requires a components scope to be provided during validation. |
| `COMPONENTS_SCOPE_MISMATCH` | None or not enough of the validated license's machine components match the provided components scope. |
| `USER_SCOPE_REQUIRED` | The validated license requires a user scope to be provided during validation. |
| `USER_SCOPE_MISMATCH` | The user scope does match a license owner or user, or it does not match the owner of the scoped machine (if scoped to a machine and it has an owner). |
| `HEARTBEAT_NOT_STARTED` | The validated machine or fingerprint scope requires a heartbeat but one is not started. |
| `HEARTBEAT_DEAD` | The validated machine or fingerprint scope belongs to a dead machine. |
| `BANNED` | The user that owns the validated license has been banned. |
| `PRODUCT_SCOPE_REQUIRED` | The validated license requires a product scope to be provided during validation. |
| `PRODUCT_SCOPE_MISMATCH` | The validated license's product relationship does not match the provided product scope. |
| `POLICY_SCOPE_REQUIRED` | The validated license requires a policy scope to be provided during validation. |
| `POLICY_SCOPE_MISMATCH` | The validated license's policy relationship does not match the provided policy scope. |
| `MACHINE_SCOPE_REQUIRED` | The validated license requires a machine scope to be provided during validation. |
| `MACHINE_SCOPE_MISMATCH` | None of the validated license's machine relationships match the provided machine scope. |
| `ENTITLEMENTS_MISSING` | The validated license's entitlement relationship is missing one or more of the entitlement scope assertions. |
| `ENTITLEMENTS_SCOPE_EMPTY` | An entitlements scope was supplied but it has an empty value. |
| `VERSION_SCOPE_REQUIRED` | The validated license requires a version scope to be provided during validation. |
| `VERSION_SCOPE_MISMATCH` | None of the validated license's accessible releases match the provided version scope, i.e. the release does not exist or it is inaccessible. |
| `CHECKSUM_SCOPE_REQUIRED` | The validated license requires a checksum scope to be provided during validation. |
| `CHECKSUM_SCOPE_MISMATCH` | None of the validated license's accessible artifacts match the provided checksum scope, i.e. a matching artifact does not exist or it is inaccessible. |

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-permissions) Required permissions

- license.validate

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-auths-bearer) Bearer

required



An authentication token with privileges to validate the resource: either an admin, the product it belongs to, the license itself (via license key or a license token), or the user it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe key of the license to be validated.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-meta) Meta

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-meta-nonce) meta.nonce

integeroptional



An arbitrary numerical nonce value that will be echoed back within the signed response body. This is useful for prevention of replay attacks.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-meta-scope) meta.scope

object<string, string>optional



Scope to validate the license against i.e. if a license's key is associated with product X, but the validation request is scoped to product Y, it will fail validation because a matching license doesn't exist for that product.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-meta-scope.product) meta.scope.product

stringoptional



The identifier (UUID) of the product to validate against. If the validated license is not associated with the given product, it is considered invalid.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-meta-scope.policy) meta.scope.policy

stringoptional



The identifier (UUID) of the policy to validate against. If the validated license is not associated with the given policy, it is considered invalid.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-meta-scope.fingerprints) meta.scope.fingerprints

array<string>optional



An array of machine fingerprints to validate against. If the validated license's associated machines do not have fingerprints which match the provided fingerprints, according to the policy's machine matching strategy, the license is considered invalid.



The `fingerprints` scope is especially useful if you need to change your fingerprinting strategy while still supporting older fingerprinting strategies, i.e. you could use a machine matching strategy of `MATCH_ANY` and send all fingerprint variants.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-meta-scope.fingerprint) meta.scope.fingerprint

stringoptional



A single fingerprint of a machine to validate against. If the validated license's associated machines do not have a fingerprint which matches the provided fingerprint, the license is considered invalid.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-meta-scope.components) meta.scope.components

array<string>optional



An array of component fingerprints to validate against. If the validated license's associated machine does not have component fingerprints which match the provided fingerprints, according to the policy's component matching strategy, the license is considered invalid.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-meta-scope.machine) meta.scope.machine

stringoptional



The identifier (UUID) of the machine to validate against. If the validated license's associated machines do not have an ID which matches the provided ID, the license is considered invalid.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-meta-scope.user) meta.scope.user

stringoptional



The identifier (UUID) or email of the user to validate against. If the validated license is not associated with the given user, or if the validated machine has an owner and it is not equal to the given user, it is considered invalid.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-meta-scope.entitlements) meta.scope.entitlements

array<string>optional



An array of entitlement codes to validate against. If the validated license's entitlements do not have codes which match the provided entitlements, the license is considered invalid.



This is especially useful to assert that a license has a given set of table-stakes entitlements. For example, if you were to have CE and EE editions of your application, asserting that certain EE entitlements are present for a given license before booting in EE may be beneficial.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-meta-scope.checksum) meta.scope.checksum

stringoptional



The checksum of an artifact to validate against. If the validated license does not have access to an artifact with the given checksum, it is considered invalid. Providing this scope will set the license's `version` attribute when valid.



In order to use the checksum scope during verification, you need to [use Keygen for distribution](https://keygen.sh/docs/api/artifacts/). By default, all release artifacts uploaded via [our CLI](https://keygen.sh/docs/cli/) will have a SHA-512 checksum.



This is especially useful to determine if the application has been modified by the end-user, i.e. crack-prevention. If the checksum does not match any release artifacts accessible by the license, the license validation will fail. Since a license belongs to a specific product, only artifacts for the license's product will be checked.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-meta-scope.version) meta.scope.version

stringoptional



The version of a release to validate against. If the validated license does not have access to a release with the given version, it is considered invalid. Providing this scope will set the license's `version` attribute when valid.



In order to use the version scope during verification, you need to [use Keygen for distribution](https://keygen.sh/docs/api/releases/).



This is especially useful to track application usage for a license, as providing this scope will set the license's `version` attribute. Since a license belongs to a specific product, only releases for the license's product will be checked.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-returns) Returns

A `200 OK` response will be returned along with the validation result and
the validated license object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/validate
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/validate
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "meta": {
      "nonce": 1574265297,
      "scope": {
        "fingerprint": "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"
      }
    }
  })
})

const { meta, data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "meta": {
      "nonce": 1574265297,
      "scope": {
        "fingerprint": "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"
      }
    }
  })
})

const { meta, data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "meta": {
      "nonce": 1574265297,
      "scope": {
        "fingerprint": "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"
      }
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "meta": {
      "nonce": 1574265297,
      "scope": {
        "fingerprint": "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "meta": [\
      "nonce": 1574265297,\
      "scope": [\
        "fingerprint": "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "meta": [\
      "nonce": 1574265297,\
      "scope": [\
        "fingerprint": "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"\
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  meta = new {
    nonce = 1574265297,
    scope = new {
      fingerprint = "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  meta = new {
    nonce = 1574265297,
    scope = new {
      fingerprint = "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "meta" to mapOf(
    "nonce" to 1574265297,
    "scope" to mapOf(
      "fingerprint" to "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate")
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
    "nonce" to 1574265297,
    "scope" to mapOf(
      "fingerprint" to "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate")
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
    entry("nonce", 1574265297),
    entry("scope", ofEntries(
      entry("fingerprint", "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate")
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
    entry("nonce", 1574265297),
    entry("scope", ofEntries(
      entry("fingerprint", "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate")
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

value scope;
scope["fingerprint"] = value::string("9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC");

value meta;
meta["nonce"] = value::number(1574265297);
meta["scope"] = scope;

value body;
body["meta"] = meta;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate");
req.set_method(methods::POST);
req.set_body(body.serialize());

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
using namespace web::json;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

value scope;
scope["fingerprint"] = value::string("9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC");

value meta;
meta["nonce"] = value::number(1574265297);
meta["scope"] = scope;

value body;
body["meta"] = meta;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "meta": {
          "nonce": 1574265297,
          "scope": {
            "fingerprint": "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"
          }
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/validate \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "meta": {
          "nonce": 1574265297,
          "scope": {
            "fingerprint": "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"
          }
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "meta": {
    "ts": "2021-03-15T19:27:50.440Z",
    "valid": false,
    "detail": "fingerprint scope does not match",
    "code": "FINGERPRINT_SCOPE_MISMATCH",
    "nonce": 1574265297,
    "scope": {
      "fingerprint": "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"
    }
  },
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", "machine.create"],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "meta": {
    "ts": "2021-03-15T19:27:50.440Z",
    "valid": false,
    "detail": "fingerprint scope does not match",
    "code": "FINGERPRINT_SCOPE_MISMATCH",
    "nonce": 1574265297,
    "scope": {
      "fingerprint": "9a:Eq:Uv:p3:yZ:tL:lC:Bz:mA:Eg:E6:Mk:YX:dK:NC"
    }
  },
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", "machine.create"],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions-validate-key) Validate by license key

Action to validate a license key. This will look up the license by its key
and check the following: if the license is suspended, if the license is
expired, if the license is overdue for check-in, and if the license meets
its machine requirements (if [strict](https://keygen.sh/docs/api/policies/#policies-object-attrs-strict)).

Additional scopes can also be applied, and may be required by the license's
policy, e.g. a policy may set `requireFingerprintScope=true`, which will
require that you specify a `scope.fingerprint` within the validation request
in order to pass validation.

The scoping feature allows you to easily set up a node-locked or floating
licensing model without additional logic on your end.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions-validate-key-codes) Validation codes

Below are the possible values for the `meta.code` key within the validation response.
This can be used to better communicate failures to end-users and to handle specific
failures within your application code.

| Code | Meaning |
| --- | --- |
| `VALID` | The validated license resource or license key is valid. |
| `NOT_FOUND` | The validated license resource or license key does not exist. |
| `SUSPENDED` | The validated license has been suspended. |
| `EXPIRED` | The validated license is expired. |
| `OVERDUE` | The validated license is overdue for check-in. |
| `NO_MACHINE` | Not activated. The validated license does not meet its node-locked policy's requirement of exactly 1 associated machine. |
| `NO_MACHINES` | Not activated. The validated license does not meet its floating policy's requirement of at least 1 associated machine. |
| `TOO_MANY_MACHINES` | The validated license has exceeded its policy's machine limit. |
| `TOO_MANY_CORES` | The validated license has exceeded its policy's machine core limit. |
| `TOO_MUCH_MEMORY` | The validated license has exceeded its policy's machine memory limit. |
| `TOO_MUCH_DISK` | The validated license has exceeded its policy's machine disk limit. |
| `TOO_MANY_PROCESSES` | The validated license has exceeded its policy's machine process limit. |
| `FINGERPRINT_SCOPE_REQUIRED` | The validated license requires a fingerprint scope to be provided during validation. |
| `FINGERPRINT_SCOPE_MISMATCH` | Not activated. None or not enough of the validated license's machine relationships match the provided machine fingerprint scope. |
| `FINGERPRINT_SCOPE_EMPTY` | A fingerprint scope was supplied but it has an empty or `null` value. |
| `COMPONENTS_SCOPE_REQUIRED` | The validated license requires a components scope to be provided during validation. |
| `COMPONENTS_SCOPE_MISMATCH` | None or not enough of the validated license's machine components match the provided components scope. |
| `USER_SCOPE_REQUIRED` | The validated license requires a user scope to be provided during validation. |
| `USER_SCOPE_MISMATCH` | The user scope does match a license owner or user, or it does not match the owner of the scoped machine (if scoped to a machine and it has an owner). |
| `HEARTBEAT_NOT_STARTED` | The validated machine or fingerprint scope requires a heartbeat but one is not started. |
| `HEARTBEAT_DEAD` | The validated machine or fingerprint scope belongs to a dead machine. |
| `BANNED` | The user that owns the validated license has been banned. |
| `PRODUCT_SCOPE_REQUIRED` | The validated license requires a product scope to be provided during validation. |
| `PRODUCT_SCOPE_MISMATCH` | The validated license's product relationship does not match the provided product scope. |
| `POLICY_SCOPE_REQUIRED` | The validated license requires a policy scope to be provided during validation. |
| `POLICY_SCOPE_MISMATCH` | The validated license's policy relationship does not match the provided policy scope. |
| `MACHINE_SCOPE_REQUIRED` | The validated license requires a machine scope to be provided during validation. |
| `MACHINE_SCOPE_MISMATCH` | None of the validated license's machine relationships match the provided machine scope. |
| `ENTITLEMENTS_MISSING` | The validated license's entitlement relationship is missing one or more of the entitlement scope assertions. |
| `ENTITLEMENTS_SCOPE_EMPTY` | An entitlements scope was supplied but it has an empty value. |
| `VERSION_SCOPE_REQUIRED` | The validated license requires a version scope to be provided during validation. |
| `VERSION_SCOPE_MISMATCH` | None of the validated license's accessible releases match the provided version scope, i.e. the release does not exist or it is inaccessible. |
| `CHECKSUM_SCOPE_REQUIRED` | The validated license requires a checksum scope to be provided during validation. |
| `CHECKSUM_SCOPE_MISMATCH` | None of the validated license's accessible artifacts match the provided checksum scope, i.e. a matching artifact does not exist or it is inaccessible. |

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-permissions) Required permissions

- license.validateOnly required when authenticated

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-auths-none) None


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta) Meta

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta-key) meta.key

stringrequired



The license key to validate.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta-nonce) meta.nonce

integeroptional



An arbitrary numerical nonce value that will be echoed back within the signed response body. This is useful for prevention of replay attacks.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta-scope) meta.scope

object<string, string>optional



Scope to validate the license against i.e. if a license's key is associated with product X, but the validation request is scoped to product Y, it will fail validation because a matching license doesn't exist for that product.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta-scope.product) meta.scope.product

stringoptional



The identifier (UUID) of the product to validate against. If the validated license is not associated with the given product, it is considered invalid.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta-scope.policy) meta.scope.policy

stringoptional



The identifier (UUID) of the policy to validate against. If the validated license is not associated with the given policy, it is considered invalid.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta-scope.fingerprints) meta.scope.fingerprints

array<string>optional



An array of machine fingerprints to validate against. If the validated license's associated machines do not have fingerprints which match the provided fingerprints, according to the policy's machine matching strategy, the license is considered invalid.



The `fingerprints` scope is especially useful if you need to change your fingerprinting strategy while still supporting older fingerprinting strategies, i.e. you could use a machine matching strategy of `MATCH_ANY` and send all fingerprint variants.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta-scope.fingerprint) meta.scope.fingerprint

stringoptional



A single fingerprint of a machine to validate against. If the validated license's associated machines do not have a fingerprint which matches the provided fingerprint, the license is considered invalid.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta-scope.components) meta.scope.components

array<string>optional



An array of component fingerprints to validate against. If the validated license's associated machine does not have component fingerprints which match the provided fingerprints, according to the policy's component matching strategy, the license is considered invalid.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta-scope.machine) meta.scope.machine

stringoptional



The identifier (UUID) of the machine to validate against. If the validated license's associated machines do not have an ID which matches the provided ID, the license is considered invalid.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta-scope.user) meta.scope.user

stringoptional



The identifier (UUID) or email of the user to validate against. If the validated license is not associated with the given user, or if the validated machine has an owner and it is not equal to the given user, it is considered invalid.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta-scope.entitlements) meta.scope.entitlements

array<string>optional



An array of entitlement codes to validate against. If the validated license's entitlements do not have codes which match the provided entitlements, the license is considered invalid.



This is especially useful to assert that a license has a given set of table-stakes entitlements. For example, if you were to have CE and EE editions of your application, asserting that certain EE entitlements are present for a given license before booting in EE may be beneficial.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta-scope.checksum) meta.scope.checksum

stringoptional



The checksum of an artifact to validate against. If the validated license does not have access to an artifact with the given checksum, it is considered invalid. Providing this scope will set the license's `version` attribute when valid.



In order to use the checksum scope during verification, you need to [use Keygen for distribution](https://keygen.sh/docs/api/artifacts/). By default, all release artifacts uploaded via [our CLI](https://keygen.sh/docs/cli/) will have a SHA-512 checksum.



This is especially useful to determine if the application has been modified by the end-user, i.e. crack-prevention. If the checksum does not match any release artifacts accessible by the license, the license validation will fail. Since a license belongs to a specific product, only artifacts for the license's product will be checked.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-meta-scope.version) meta.scope.version

stringoptional



The version of a release to validate against. If the validated license does not have access to a release with the given version, it is considered invalid. Providing this scope will set the license's `version` attribute when valid.



In order to use the version scope during verification, you need to [use Keygen for distribution](https://keygen.sh/docs/api/releases/).



This is especially useful to track application usage for a license, as providing this scope will set the license's `version` attribute. Since a license belongs to a specific product, only releases for the license's product will be checked.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-validate-key-returns) Returns

A `200 OK` response will be returned along with the validation result and
the validated license object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key
https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json"
  },
  body: JSON.stringify({
    "meta": {
      "key": "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",
      "scope": {
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"
      }
    }
  })
})

const { meta, data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json"
  },
  body: JSON.stringify({
    "meta": {
      "key": "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",
      "scope": {
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"
      }
    }
  })
})

const { meta, data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json"
  },
  data=json.dumps({
    "meta": {
      "key": "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",
      "scope": {
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"
      }
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json"
  },
  data=json.dumps({
    "meta": {
      "key": "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",
      "scope": {
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json"\
  ],
  parameters: [\
    "meta": [\
      "key": "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",\
      "scope": [\
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json"\
  ],
  parameters: [\
    "meta": [\
      "key": "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",\
      "scope": [\
        "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"\
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
  "licenses/actions/validate-key",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");

request.AddJsonBody(new {
  meta = new {
    key = "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",
    scope = new {
      fingerprint = "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/actions/validate-key",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");

request.AddJsonBody(new {
  meta = new {
    key = "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",
    scope = new {
      fingerprint = "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "meta" to mapOf(
    "key" to "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",
    "scope" to mapOf(
      "fingerprint" to "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "meta" to mapOf(
    "key" to "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",
    "scope" to mapOf(
      "fingerprint" to "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key")
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
    entry("key", "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3"),
    entry("scope", ofEntries(
      entry("fingerprint", "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key")
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
    entry("key", "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3"),
    entry("scope", ofEntries(
      entry("fingerprint", "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC")
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key")
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

value scope;
scope["fingerprint"] = value::string("4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC");

value meta;
meta["key"] = value::string("C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3");
meta["scope"] = scope;

value body;
body["meta"] = meta;

req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/actions/validate-key");
req.set_method(methods::POST);
req.set_body(body.serialize());

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
using namespace web::json;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

value scope;
scope["fingerprint"] = value::string("4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC");

value meta;
meta["key"] = value::string("C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3");
meta["scope"] = scope;

value body;
body["meta"] = meta;

req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/actions/validate-key");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -d '{
        "meta": {
          "key": "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",
          "scope": {
            "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"
          }
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/actions/validate-key \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -d '{
        "meta": {
          "key": "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",
          "scope": {
            "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"
          }
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "meta": {
    "ts": "2021-03-15T19:27:50.440Z",
    "valid": false,
    "detail": "is expired",
    "code": "EXPIRED",
    "scope": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"
    }
  },
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "meta": {
    "ts": "2021-03-15T19:27:50.440Z",
    "valid": false,
    "detail": "is expired",
    "code": "EXPIRED",
    "scope": {
      "fingerprint": "4d:Eq:UV:D3:XZ:tL:WN:Bz:mA:Eg:E6:Mk:YX:dK:NC"
    }
  },
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2022-03-15T19:27:50.440Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions-suspend) Suspend license

Action to temporarily suspend (ban) a license. This will cause the license
to fail validation until reinistated. To permanently revoke a license,
see the [revoke action](https://keygen.sh/docs/api/licenses/#licenses-actions-revoke).

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-suspend-permissions) Required permissions

- license.suspend

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-suspend-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-suspend-auths-bearer) Bearer

required



An authentication token with privileges to suspend the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-suspend-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-suspend-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-suspend-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe key of the license to suspend.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-suspended-returns) Returns

A `200 OK` response will be returned along with the suspended license object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/suspend
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/suspend
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend", {
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
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend",
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend")
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend");
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/suspend \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": true,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": true,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions-reinstate) Reinstate license

Action to reinstate a suspended license.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reinstate-permissions) Required permissions

- license.reinstate

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reinstate-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reinstate-auths-bearer) Bearer

required



An authentication token with privileges to reinstate the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reinstate-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reinstate-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reinstate-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe key of the license to reinstate.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reinstate-returns) Returns

A `200 OK` response will be returned along with the reinstated license object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/reinstate
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/reinstate
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate", {
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
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate",
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate")
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate");
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reinstate \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions-renew) Renew license

Action to renew a license. Extends license expiry by the policy's duration, according
to the policy's renewal basis.

**Renewals do not guarantee the license's renewed expiry will land on the same day**
**as the original expiry.** Renewals take the license's current expiry datetime and
add, in seconds, the policy's duration, according to the policy's renewal basis.
More complex logic for subscription purposes, such as ensuring the renewed
expiry lands on the same day, you will need to calculate and update the
`expiry` attribute yourself.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-renew-permissions) Required permissions

- license.renew

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-renew-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-renew-auths-bearer) Bearer

required



An authentication token with privileges to renew the resource: either an admin, the product it belongs to, or if the license's policy is unprotected, the user it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-renew-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-renew-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-renew-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe key of the license to renew.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-renew-returns) Returns

A `200 OK` response will be returned along with the renewed license object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/renew
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/renew
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew", {
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
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew",
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew")
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew");
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/renew \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions-revoke) Revoke license

Action to revoke (delete) a license. This cannot be undone. This action also
immediately deletes any machines that the license is associated with.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-revoke-permissions) Required permissions

- license.revoke

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-revoke-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-revoke-auths-bearer) Bearer

required



An authentication token with privileges to revoke the resource: either an admin, the product it belongs to, or if the license's policy is unprotected, the user it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-revoke-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-revoke-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-revoke-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe key of the license to revoke.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-revoke-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/revoke
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/revoke
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
content_copyimport requests
import json

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke",
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke")
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke");
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke");
req.set_method(methods::DELETE);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/revoke \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 204 No Content

```
No content
No content
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions-check-out) Check-out license

Action to check-out a license. This will generate a snapshot of the license at time
of checkout, encoded into a license file certificate that can be decoded and used
for licensing offline and air-gapped environments. The algorithm will depend on
the policy's `scheme`, or the provided `algorithm`.

License files can be distributed using email or USB drives to air-gapped devices.

For instructions on verifying a license file, please see [license file verification](https://keygen.sh/docs/api/cryptography/#cryptographic-lic).

**Need to download the license file right away?** Instead of sending a `POST` request, you can
send a `GET` request and our API will respond with the plaintext license file certificate,
rather than a JSON response.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-out-permissions) Required permissions

- license.check-out
- license.read

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-out-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-out-auths-bearer) Bearer

required



An authentication token with privileges to check-out the resource: either an admin, the product it belongs to, the license itself (via license key or a license token), or if the license is unprotected, the user it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-out-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-out-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-out-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe key of the license to check-out.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-out-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-out-query-ttl) ttl

integeroptionaldefault=2629746 (1 month)



The time-to-live (TTL) of the checked out license file, in seconds. This will be used in calculating the license file's expiry. Must be at least 1 hour (3600). May be set to `null`, but we typically do not recommend that, as then its perpetual and irrevocable.



Setting a TTL allows changes to the license object, e.g. expiry, suspension, or metadata changes, to _eventually_ propagate to all offline installations. No expiry means these changes are not guaranteed to propagate, since no re-checkout is required.





```
/v1/accounts/<account>/licenses/<id>/actions/check-out?ttl=86400
/v1/accounts/<account>/licenses/<id>/actions/check-out?ttl=86400
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-out-query-include) include

array<string>optional



Include relationship data in the license file. Can be any combination of: `entitlements`, `product`, `policy`, `owner`, `users`, `environment`, or `group`.



Please note that the request bearer must have permission to read all included objects. That means that, by default, licenses and users cannot include the environment, product or policy objects; in addition, licenses cannot include the user object.





```
/v1/accounts/<account>/licenses/<id>/actions/check-out?include=entitlements,owner,group
/v1/accounts/<account>/licenses/<id>/actions/check-out?include=entitlements,owner,group
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-out-query-encrypt) encrypt

booleanoptional



Whether or not to encrypt the license file. The license file will be encrypted using AES-256-GCM, with a SHA256 digest of the license's key as the secret.



This cannot be used in combination with the `algorithm` parameter.





```
/v1/accounts/<account>/licenses/<id>/actions/check-out?encrypt=1
/v1/accounts/<account>/licenses/<id>/actions/check-out?encrypt=1
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-out-query-algorithm) algorithm

stringoptional



The algorithm of the checked out license file. This will be used to determine whether or not the license file is encrypted, and what signing algorithm to use. Must be one of: `aes-256-gcm+ed25519`, `aes-256-gcm+ecdsa-p256`, `aes-256-gcm+rsa-pss-sha256`, `aes-256-gcm+rsa-sha256`, `base64+ed25519`, `base64+ecdsa-p256`, `base64+rsa-pss-sha256`, or `base64+rsa-sha256`.



This cannot be used in combination with the `encrypt` parameter.





```
/v1/accounts/<account>/licenses/<id>/actions/check-out?algorithm=aes-256-gcm%2Bed25519
/v1/accounts/<account>/licenses/<id>/actions/check-out?algorithm=aes-256-gcm%2Bed25519
```


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-out-returns) Returns

A `200 OK` response will be returned along with the license file object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/check-out
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/check-out
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out", {
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
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out",
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out")
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out");
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-out \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "3274f93c-7847-4aaf-83b9-f42996d9c432",
    "type": "license-files",
    "attributes": {
      "certificate": "-----BEGIN LICENSE FILE-----\neyJlbmMiOiJlRXZGTzdGaGo5Vjl6SGZBaWhucWxhUDhtU29VMmh4S3NUWHZR\nczdRT3EyV3VsdjU3U2pNZ2dDS0Znek1Eam9nRGZ2Z3RXWXJUVWhqc1JkdDcz\naDQ2N2RzMkxFVTBFOHExVU82STVQRWpnMzE0UTI4V3JmNTkvL1ZBK1hxQWxL\nRGJ6cndyeUxuQjdaZUs4czRsQllqTmcxSW9NaUxkQ21LWXdXLzZTN2N4WHF0\neEdOQ0VQYlpoNkNPcTFFNnpWK080OXZOYjVtbjkyZG9vM1U4QzJDRVNvdUha\nRWNNTDdrdmFjTG1HZWg3cFBXckxNdGNCRVFuejV3b1FLM0c5MEp4VTQ1cGRx\nZ0xBVnRqc2o1Z0NtamhyOWdHVmxINkFWTDZvWTgySnRYY1B3bnlYOUdTbmVk\nMWYzQTlDbnR6bm9sZzhNTlhyVG5acW4ydjlmVUx0djMwRXFwZ2g4bWozamVG\nMitMVCtmVTZha01oMnZVNFloSlB1MGhYTmY5VTNmdGUrd2g3b3NiQmZ2SGlw\nWUF4bVQ1T0djYk9IOSs5OEQxdzhkYi9WZkl4S3BIU2VKaGdxT1p6YW0wekZO\nUEdVQmdGUXM1UDJObkhuZ0VoQjQvZzVER0QyMm53cWhvaTJUNnEvSUUzd1VV\nTVZqTEFYMnM5aytZcXhZaFhsTGJmeHdmL2tUdnplWm9Uc3JFTjZHcFI4V1Vh\nbU02UGJ2SW1LMHJDcDJOQ0xKNEdYckZ5d09WZU12WXd4WkdGbkpuQVREMVFK\nMVhpdHhoZncvaW5pM3k5TVFpM0Z0OElFdC9VNUZJMWIxOVVGZ0xMWW51M3JM\nL2JwMGQzQVN5bFRybkVxdG5vRlYxK3pSSDZLUVNaQUlIMVNsMzRRZ3l6ZlJF\nYmtjRlhDZkQ2RWg2aDdUVS9wTGZqSGgzMUJWV3k2Tms1YStzbi9CYWMwU0pB\ncGZpVStyVVNKNnpiRkcvL3loQkR5SHh6L09wbWZWa015WXBqSERTWC8wTy9a\nRjZZSkpNVWpQR2MwWXZWVEVSaFlISkcwMm5mR3RycjV3VHFEWXo2T0pLcGlZ\nM0tQZWN6dFZhTW9mRmREb2t1dm80VzhnVktMZ3FKZW81TlE2a2JLZHFhRnpt\nclpIWmQ1THRRWVAvZDdjUjMvUWM5dVcyQjRYL2lHVzVCbzhxMENYU1pQTzdW\nak1YbjFCcEgzQXJDUTVlZnNwMnUxZ1ZjbEZEdEZpdmpObmtlejVzL2lucTdz\nVWNVZXR2WVJra0xWUG9pdXl1dE9HVzdVMS9tRjVOTzRHTjZzbXNKRnNyM1BT\nQzA3VjdFelVmRDhOK3JGbTRxYXhGY0xSRmg3bzU2VDdJRjlrQkhOMU82ZjNm\nWUZiR2tsN0NKcWRPRFc1SS9uMkhycVNOWjBseWhJMUNVakxxVDV0NnZsbytQ\nR0ZzMDN1N1AwNURwazVxU3dralIwNDhIemcyRktGdUUxbFZlSFVCVmg3L3VH\nSTNEZUt6ZUw2VUovS0hLSHByRTl1dGEyRFBaNys0UUlJSUFReWkwcHBvZDJ3\nUnI1MFNaRkkvUE0wMTNOT01CYzAyTnVhRnNIZ2dFc21HcnpSQkZyZExDRG8x\nR0lmbE5hVVcya0ZrSDJBVk9NRklYL0t0am92MFNkNVlBeERLcTRnb2s2Y0hu\nYk1iSkR2TWFaMm95bEhveWg2YXgzejkrQUN3dFJza1I4T3RrODVKcVg0RHJ1\nWldBbU5Nb1dyU1BsZUxMRW1rZG4vWGtjSXhwQ2pweHNBd2t4YVFTWVErM2Ix\nSzdJZ3UxZklaNC9ZTGtldzVQYVdwL2d4eTJwL0ltSkQyYWN5d1pyRmFRaW9r\ndWNNZDlycmxjYUREWXJtdnY0aUhFNUc1SU52WUZ5d3Jud25GYkRud3ZUMEI4\nOUo2Zm8vUWlyVlVWc2prMHNmM2k0S1ViMWhPdGJPK1pJVlNNdEZxL1FMbUFX\nblhsTzc3UTJxVTBCRy9XVTJzWEI2clZyVVhvSUtiYU1LSzdHMjJKdG50VldU\nK2NnaXJuSHRaSkpxZUlqUEt5R1pNYzQwRExlN3lWMmMraWdsM1lkdERIN3FM\nOVFEM0NaUGRNZEowY051VG9GYnhsQTJpRmNrNzVacVh1SnN0WVlBRVZWRWNw\nSXliRllLSkJNTXZqblJ6RnMyWTl3djgyL0pLWEt0TXBta3QrL3JwUmxCdUl2\nZnRFWHdFQkhteHVKVjZoK3JQMC9RNjMrT0JPazdPUWcwcU52OGhtQzhWWnI1\nK0lxc3JBS2dFZ09JWUp0QmZ6U041RmViTk8ybkVwKytMQW1MT0hsRHpRMzB3\neWllWGRpenJZaS9ScnR1VXh3QUowcmVHY3lwMmRjQzRhSlFSNmVDdDBqZjI2\nNU5ka2tJVkxqOGRQUmg5dHpiYlZrYnkydVcyYml2dnl2cjlYUWJ3Uk9YNVZk\nRGtVWUZVL1ZPYkpRUHhQYUJJemJ2QTNqWG95N3B4dkFTWllQTjMwdWM2QnIz\nYWNMQXBnR01mbDBXRkh3QmtReDJ0NVcrT25xZHBWNGhEOHM5TUFzUjFIRCtL\na0tmQUR3TDNwSkZvOStvSTBEbnhyN0dMTjU5cDhmb010dW81V2ZuT3YveU9T\nVWxwcElxeDVTYWgyTUNiaFE3OXFJZlJhU0hzaUpHckFhLzQ1L2VsbWFmMGsr\ncVRtWmtMTTIxaVRrMUkvWmhyNi9mSnJ3K1RmOXlNKzZjbkV3dHhTVjhFb0Yz\nZXFZa3NoU0J1b1VJNEVucDhhTlBpaWZ1eTU0V0Z4NDlPNlZsSDJWWHN2dWo5\nTVNHQUZoQXFBdStyemplUEptS2dDUnNYeHUvN0ZjQjh5dGlRaFFxaVg0S2lh\nQmdEQ2s2RU43YjNmTVBQOHdycnduTFVyRkhzRy9xcWdDeXljSDZkSGE2V0da\nMElnTll5SXNRTFgybFZsbzcydUd0cmRtdzVXditaQUE5d3NZTWVnL3cyZzZi\nN2RuZWdiTmJQT3NiVFg3OFJHSVQvTGNmOS95TzhCSGVURnpuYjNDUGdFTndz\nOHk0UFh4Y1dCQU4xcWI3dFZMSldEdHFhMytDWVZxajNHT2RQbzQxSFBRUkxC\nc0xKUSttUVBzbUV6YkZJejdDK3VvVFhvY2hPV1daK0hWWFBFRkZXdkhXUlVz\nNVF6MVhQZVA0S09xQlBmMm1SWEFPT3loWGx4MXNiS2FMUzdyMEhYSTJ5TlFL\nNzljKzBaQ2pyOVdVTDFmMmtLWDQ5N3JldkJrSGR3ODRna3g3bGNHdTYyYys4\nc2VjS09uRHR0Y0tQKytwNyt3ejNoMTE1b3R6bFFnNktkclc2OFNsUVpPaEhP\nNFNpS2VqeHZYdHNWOW9rK25mU0MreG9WWUplOFg1RmJENnJpRDlJZ2U4eHZL\ndjRTN3FhQlEvZVlJNzBOY2lhWjZ5RzZ0THhJaHpBWlkxaVIrd1lVUjB4L0gx\nUDk4K3o4bkNxYkVOSmhhWFBlVTNkaEY4eUxzMzVEUWNWcXo0OURsZHlNYzB3\nTmd3L3VBNjNQbWVBZ3N0NVJQNE1zZlZzTVAraG54MWg0QTBmcmlGL0JuN095\nekxiMkpQYmNvMXFtU0hNTFI5R2xCeXlHS3NkWlZXNXF3WisyTDM5eDRnc3ZP\nZ0xvNnVjSUpmRktab25yNG9WNllMMG5zRmdSU2t5RjE0Q3pNbmhtVDBXdlV0\nY1FFR24yMExhUjZCbDU0TCtzdEtYRUhZVUQzY1BQa1BaaWR0VT0uT25IQWZO\nUG5qWTgrK2FzbS4xQ1ZvZ1JrR3c3c3htNFpBS3BPeVVnPT0iLCJzaWciOiIy\nYmRRQk83bVpKT0V1OXdIVXhHZGo5S3RLZVZTbU1lMElOV0hKaEErRkkrSjF5\nVzNhd2cvdVZNNHlDRWZ2Y0hwN3dMb25rOUlmOThoT0lKcDhCOU9DZz09Iiwi\nYWxnIjoiYWVzLTI1Ni1nY20rZWQyNTUxOSJ9\n-----END LICENSE FILE-----\n",
      "algorithm": "base64+ed25519",
      "includes": [],
      "ttl": 2629746,
      "expiry": "2022-04-28T19:16:39.154Z",
      "issued": "2022-03-28T19:16:39.154Z"
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
        },
        "data": {
          "type": "licenses",
          "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827"
        }
      }
    }
  }
}
{
  "data": {
    "id": "3274f93c-7847-4aaf-83b9-f42996d9c432",
    "type": "license-files",
    "attributes": {
      "certificate": "-----BEGIN LICENSE FILE-----\neyJlbmMiOiJlRXZGTzdGaGo5Vjl6SGZBaWhucWxhUDhtU29VMmh4S3NUWHZR\nczdRT3EyV3VsdjU3U2pNZ2dDS0Znek1Eam9nRGZ2Z3RXWXJUVWhqc1JkdDcz\naDQ2N2RzMkxFVTBFOHExVU82STVQRWpnMzE0UTI4V3JmNTkvL1ZBK1hxQWxL\nRGJ6cndyeUxuQjdaZUs4czRsQllqTmcxSW9NaUxkQ21LWXdXLzZTN2N4WHF0\neEdOQ0VQYlpoNkNPcTFFNnpWK080OXZOYjVtbjkyZG9vM1U4QzJDRVNvdUha\nRWNNTDdrdmFjTG1HZWg3cFBXckxNdGNCRVFuejV3b1FLM0c5MEp4VTQ1cGRx\nZ0xBVnRqc2o1Z0NtamhyOWdHVmxINkFWTDZvWTgySnRYY1B3bnlYOUdTbmVk\nMWYzQTlDbnR6bm9sZzhNTlhyVG5acW4ydjlmVUx0djMwRXFwZ2g4bWozamVG\nMitMVCtmVTZha01oMnZVNFloSlB1MGhYTmY5VTNmdGUrd2g3b3NiQmZ2SGlw\nWUF4bVQ1T0djYk9IOSs5OEQxdzhkYi9WZkl4S3BIU2VKaGdxT1p6YW0wekZO\nUEdVQmdGUXM1UDJObkhuZ0VoQjQvZzVER0QyMm53cWhvaTJUNnEvSUUzd1VV\nTVZqTEFYMnM5aytZcXhZaFhsTGJmeHdmL2tUdnplWm9Uc3JFTjZHcFI4V1Vh\nbU02UGJ2SW1LMHJDcDJOQ0xKNEdYckZ5d09WZU12WXd4WkdGbkpuQVREMVFK\nMVhpdHhoZncvaW5pM3k5TVFpM0Z0OElFdC9VNUZJMWIxOVVGZ0xMWW51M3JM\nL2JwMGQzQVN5bFRybkVxdG5vRlYxK3pSSDZLUVNaQUlIMVNsMzRRZ3l6ZlJF\nYmtjRlhDZkQ2RWg2aDdUVS9wTGZqSGgzMUJWV3k2Tms1YStzbi9CYWMwU0pB\ncGZpVStyVVNKNnpiRkcvL3loQkR5SHh6L09wbWZWa015WXBqSERTWC8wTy9a\nRjZZSkpNVWpQR2MwWXZWVEVSaFlISkcwMm5mR3RycjV3VHFEWXo2T0pLcGlZ\nM0tQZWN6dFZhTW9mRmREb2t1dm80VzhnVktMZ3FKZW81TlE2a2JLZHFhRnpt\nclpIWmQ1THRRWVAvZDdjUjMvUWM5dVcyQjRYL2lHVzVCbzhxMENYU1pQTzdW\nak1YbjFCcEgzQXJDUTVlZnNwMnUxZ1ZjbEZEdEZpdmpObmtlejVzL2lucTdz\nVWNVZXR2WVJra0xWUG9pdXl1dE9HVzdVMS9tRjVOTzRHTjZzbXNKRnNyM1BT\nQzA3VjdFelVmRDhOK3JGbTRxYXhGY0xSRmg3bzU2VDdJRjlrQkhOMU82ZjNm\nWUZiR2tsN0NKcWRPRFc1SS9uMkhycVNOWjBseWhJMUNVakxxVDV0NnZsbytQ\nR0ZzMDN1N1AwNURwazVxU3dralIwNDhIemcyRktGdUUxbFZlSFVCVmg3L3VH\nSTNEZUt6ZUw2VUovS0hLSHByRTl1dGEyRFBaNys0UUlJSUFReWkwcHBvZDJ3\nUnI1MFNaRkkvUE0wMTNOT01CYzAyTnVhRnNIZ2dFc21HcnpSQkZyZExDRG8x\nR0lmbE5hVVcya0ZrSDJBVk9NRklYL0t0am92MFNkNVlBeERLcTRnb2s2Y0hu\nYk1iSkR2TWFaMm95bEhveWg2YXgzejkrQUN3dFJza1I4T3RrODVKcVg0RHJ1\nWldBbU5Nb1dyU1BsZUxMRW1rZG4vWGtjSXhwQ2pweHNBd2t4YVFTWVErM2Ix\nSzdJZ3UxZklaNC9ZTGtldzVQYVdwL2d4eTJwL0ltSkQyYWN5d1pyRmFRaW9r\ndWNNZDlycmxjYUREWXJtdnY0aUhFNUc1SU52WUZ5d3Jud25GYkRud3ZUMEI4\nOUo2Zm8vUWlyVlVWc2prMHNmM2k0S1ViMWhPdGJPK1pJVlNNdEZxL1FMbUFX\nblhsTzc3UTJxVTBCRy9XVTJzWEI2clZyVVhvSUtiYU1LSzdHMjJKdG50VldU\nK2NnaXJuSHRaSkpxZUlqUEt5R1pNYzQwRExlN3lWMmMraWdsM1lkdERIN3FM\nOVFEM0NaUGRNZEowY051VG9GYnhsQTJpRmNrNzVacVh1SnN0WVlBRVZWRWNw\nSXliRllLSkJNTXZqblJ6RnMyWTl3djgyL0pLWEt0TXBta3QrL3JwUmxCdUl2\nZnRFWHdFQkhteHVKVjZoK3JQMC9RNjMrT0JPazdPUWcwcU52OGhtQzhWWnI1\nK0lxc3JBS2dFZ09JWUp0QmZ6U041RmViTk8ybkVwKytMQW1MT0hsRHpRMzB3\neWllWGRpenJZaS9ScnR1VXh3QUowcmVHY3lwMmRjQzRhSlFSNmVDdDBqZjI2\nNU5ka2tJVkxqOGRQUmg5dHpiYlZrYnkydVcyYml2dnl2cjlYUWJ3Uk9YNVZk\nRGtVWUZVL1ZPYkpRUHhQYUJJemJ2QTNqWG95N3B4dkFTWllQTjMwdWM2QnIz\nYWNMQXBnR01mbDBXRkh3QmtReDJ0NVcrT25xZHBWNGhEOHM5TUFzUjFIRCtL\na0tmQUR3TDNwSkZvOStvSTBEbnhyN0dMTjU5cDhmb010dW81V2ZuT3YveU9T\nVWxwcElxeDVTYWgyTUNiaFE3OXFJZlJhU0hzaUpHckFhLzQ1L2VsbWFmMGsr\ncVRtWmtMTTIxaVRrMUkvWmhyNi9mSnJ3K1RmOXlNKzZjbkV3dHhTVjhFb0Yz\nZXFZa3NoU0J1b1VJNEVucDhhTlBpaWZ1eTU0V0Z4NDlPNlZsSDJWWHN2dWo5\nTVNHQUZoQXFBdStyemplUEptS2dDUnNYeHUvN0ZjQjh5dGlRaFFxaVg0S2lh\nQmdEQ2s2RU43YjNmTVBQOHdycnduTFVyRkhzRy9xcWdDeXljSDZkSGE2V0da\nMElnTll5SXNRTFgybFZsbzcydUd0cmRtdzVXditaQUE5d3NZTWVnL3cyZzZi\nN2RuZWdiTmJQT3NiVFg3OFJHSVQvTGNmOS95TzhCSGVURnpuYjNDUGdFTndz\nOHk0UFh4Y1dCQU4xcWI3dFZMSldEdHFhMytDWVZxajNHT2RQbzQxSFBRUkxC\nc0xKUSttUVBzbUV6YkZJejdDK3VvVFhvY2hPV1daK0hWWFBFRkZXdkhXUlVz\nNVF6MVhQZVA0S09xQlBmMm1SWEFPT3loWGx4MXNiS2FMUzdyMEhYSTJ5TlFL\nNzljKzBaQ2pyOVdVTDFmMmtLWDQ5N3JldkJrSGR3ODRna3g3bGNHdTYyYys4\nc2VjS09uRHR0Y0tQKytwNyt3ejNoMTE1b3R6bFFnNktkclc2OFNsUVpPaEhP\nNFNpS2VqeHZYdHNWOW9rK25mU0MreG9WWUplOFg1RmJENnJpRDlJZ2U4eHZL\ndjRTN3FhQlEvZVlJNzBOY2lhWjZ5RzZ0THhJaHpBWlkxaVIrd1lVUjB4L0gx\nUDk4K3o4bkNxYkVOSmhhWFBlVTNkaEY4eUxzMzVEUWNWcXo0OURsZHlNYzB3\nTmd3L3VBNjNQbWVBZ3N0NVJQNE1zZlZzTVAraG54MWg0QTBmcmlGL0JuN095\nekxiMkpQYmNvMXFtU0hNTFI5R2xCeXlHS3NkWlZXNXF3WisyTDM5eDRnc3ZP\nZ0xvNnVjSUpmRktab25yNG9WNllMMG5zRmdSU2t5RjE0Q3pNbmhtVDBXdlV0\nY1FFR24yMExhUjZCbDU0TCtzdEtYRUhZVUQzY1BQa1BaaWR0VT0uT25IQWZO\nUG5qWTgrK2FzbS4xQ1ZvZ1JrR3c3c3htNFpBS3BPeVVnPT0iLCJzaWciOiIy\nYmRRQk83bVpKT0V1OXdIVXhHZGo5S3RLZVZTbU1lMElOV0hKaEErRkkrSjF5\nVzNhd2cvdVZNNHlDRWZ2Y0hwN3dMb25rOUlmOThoT0lKcDhCOU9DZz09Iiwi\nYWxnIjoiYWVzLTI1Ni1nY20rZWQyNTUxOSJ9\n-----END LICENSE FILE-----\n",
      "algorithm": "base64+ed25519",
      "includes": [],
      "ttl": 2629746,
      "expiry": "2022-04-28T19:16:39.154Z",
      "issued": "2022-03-28T19:16:39.154Z"
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
        },
        "data": {
          "type": "licenses",
          "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions-check-in) Check-in license

Action to check-in a license. Sets the license's `lastCheckIn` to the current
time, and the license's `nextCheckIn` according to the policy's check-in
interval.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-in-permissions) Required permissions

- license.check-in

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-in-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-in-auths-bearer) Bearer

required



An authentication token with privileges to check-in the resource: either an admin, the product it belongs to, the license itself (via license key or a license token), or if the license is unprotected, the user it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-in-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-in-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-in-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe key of the license to check-in.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-check-in-returns) Returns

A `200 OK` response will be returned along with the checked in license object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/check-in
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/check-in
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in", {
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
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in",
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in")
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in");
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/check-in \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": true,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": "2017-01-02T20:26:53.464Z",
      "nextCheckIn": "2017-01-03T20:26:53.464Z",
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": true,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": "2017-01-02T20:26:53.464Z",
      "nextCheckIn": "2017-01-03T20:26:53.464Z",
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions-increment-usage) Increment license usage

Action to increment a license's `uses` attribute in accordance with its
policy's `maxUses` attribute. When the policy's `maxUses` limit is exceeded,
the increment attempt will fail. When the policy's `maxUses` is set to `null`,
there is no limit on usage.

**Usage should not be used to track activations.** Instead, you should use proper
[machine activation](https://keygen.sh/docs/activating-machines/). Implementing usage for this
purpose can lead to duplicate activations, the inability to deactivate, and
in general, it goes against the recommended validation-based activation flow
we offer. We do not recommend it.

**The `uses` attribute cannot be incremented more than the maximum value of a**
**4 byte integer, `2,147,483,647`.** If you need to store larger values,
you may need to store usage information in your own datastore. Please [reach out](mailto:support@keygen.sh)
if you have any questions.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-increment-usage-permissions) Required permissions

- license.usage.increment

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-increment-usage-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-increment-usage-auths-bearer) Bearer

required



An authentication token with privileges to increment the resource's usage: either an admin, the product it belongs to, the license itself (via license key or a license token), or if the license is unprotected, the user it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-increment-usage-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-increment-usage-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-increment-usage-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe key of the license to increment usage for.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-increment-usage-meta) Meta

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-increment-usage-meta-increment) meta.increment

integeroptionaldefault=1



The amount to increment the license's usage by.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-increment-usage-returns) Returns

A `200 OK` response will be returned along with the incremented `uses` count
within the license object. A `422 Unprocessable Entity` will be returned in
the case where the policy's `maxUses` count has been exceeded.

**Though rare, a `409 Conflict` will be returned in the case where a previous**
**increment operation has not yet completed.** This is likely due to you firing
off too many increment requests in parallel. Increase the time between requests
or increment in larger batches by utilizing the `meta.increment` parameter.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/increment-usage
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/increment-usage
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "meta": {
      "increment": 25
    }
  })
})

const { meta, data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "meta": {
      "increment": 25
    }
  })
})

const { meta, data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "meta": {
      "increment": 25
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "meta": {
      "increment": 25
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "meta": [\
      "increment": 25\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "meta": [\
      "increment": 25\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  meta = new {
    increment = 25
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  meta = new {
    increment = 25
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "meta" to mapOf(
    "increment" to 25
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage")
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
    "increment" to 25
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage")
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
    entry("increment", 25)
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage")
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
    entry("increment", 25)
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage")
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
meta["increment"] = value::int(25);

value body;
body["meta"] = meta;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage");
req.set_method(methods::POST);
req.set_body(body.serialize());

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
using namespace web::json;
using namespace utility;

http_client client("https://api.keygen.sh/v1/accounts/<account>");
http_request req;

value meta;
meta["increment"] = value::int(25);

value body;
body["meta"] = meta;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "meta": {
          "increment": 25
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/increment-usage \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "meta": {
          "increment": 25
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 25,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": 100,
      "requireHeartbeat": false,
      "requireCheckIn": true,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": "2017-01-02T20:26:53.464Z",
      "nextCheckIn": "2017-01-03T20:26:53.464Z",
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 25,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": 100,
      "requireHeartbeat": false,
      "requireCheckIn": true,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": "2017-01-02T20:26:53.464Z",
      "nextCheckIn": "2017-01-03T20:26:53.464Z",
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions-decrement-usage) Decrement license usage

Action to decrement a license's `uses` attribute in accordance with its
policy's `maxUses` attribute.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-decrement-usage-permissions) Required permissions

- license.usage.decrement

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-decrement-usage-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-decrement-usage-auths-bearer) Bearer

required



An authentication token with privileges to decrement the resource's usage: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-decrement-usage-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-decrement-usage-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-decrement-usage-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe key of the license to decrement usage for.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-decrement-usage-meta) Meta

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-decrement-usage-meta-decrement) meta.decrement

integeroptionaldefault=1



The amount to decrement the license's usage by.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-decrement-usage-returns) Returns

A `200 OK` response will be returned along with the decremented `uses` count
within the license object.

**Though rare, a `409 Conflict` will be returned in the case where a previous**
**decrement operation has not yet completed.** This is likely due to you firing
off too many decrement requests in parallel. Increase the time between requests
or decrement in larger batches by utilizing the `meta.decrement` parameter.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/decrement-usage
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/decrement-usage
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage", {
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
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage",
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage")
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage");
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/decrement-usage \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": 5,
      "requireHeartbeat": false,
      "requireCheckIn": true,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckIn": "2017-01-02T20:26:53.464Z",
      "lastCheckOut": null,
      "nextCheckIn": "2017-01-03T20:26:53.464Z",
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": 5,
      "requireHeartbeat": false,
      "requireCheckIn": true,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckIn": "2017-01-02T20:26:53.464Z",
      "lastCheckOut": null,
      "nextCheckIn": "2017-01-03T20:26:53.464Z",
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-actions-reset-usage) Reset license usage

Action to reset a license's `uses` attribute to `0`.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reset-usage-permissions) Required permissions

- license.usage.reset

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reset-usage-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reset-usage-auths-bearer) Bearer

required



An authentication token with privileges to reset the resource's usage: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reset-usage-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reset-usage-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reset-usage-params-id) <id>

stringrequired



The identifier (UUID) or URL-safe key of the license to reset usage for.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-reset-usage-returns) Returns

A `200 OK` response will be returned along with the reset `uses` count
within the license object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/reset-usage
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/actions/reset-usage
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage", {
  method: "POST",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage", {
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
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage",
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage",
  Method.POST
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage")
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage");
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage");
req.set_method(methods::POST);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/actions/reset-usage \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": 5,
      "requireHeartbeat": false,
      "requireCheckIn": true,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": "2017-01-02T20:26:53.464Z",
      "nextCheckIn": "2017-01-03T20:26:53.464Z",
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": true,
      "strict": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": 5,
      "requireHeartbeat": false,
      "requireCheckIn": true,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": "2017-01-02T20:26:53.464Z",
      "nextCheckIn": "2017-01-03T20:26:53.464Z",
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/licenses/\#licenses-relationships) License relationships

Relationship endpoints for the license resource.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-relationships-activation-tokens) Generate a license token

Create a license token for a license. A license token has permission to activate
and deactivate machines for the given license, among other things.

An alternative to Token Authentication is [License Authentication](https://keygen.sh/docs/api/authentication/#license-authentication).
Typically, we recommend using License Authentication where possible, as it very
much simplifies an integration.

**A typical machine activation flow using license tokens will require you to**
**deliver the license key, as well as the license token to your customer (e.g.**
**via email).** In this scenario, you would generate a license token after
creating a license for them, all of which would likely be done after purchase.


Providing the customer with both the license token and the
license key will allow them to validate their license and activate/deactivate
machines without having to sign up for a [user](https://keygen.sh/docs/api/users/) profile, since the
machine-related endpoints require API authentication.


Another solution would be to deliver only the license token to your customer,
and use the license token to request license information using the [`/me` API\\
endpoint](https://keygen.sh/docs/api/profiles/). This is an easy way to only deliver one value to your customer,
while allowing your app to retrieve enough information to perform any necessary
API requests.


If this all seems complex, it's because it is. We created [license key authentication](https://keygen.sh/blog/announcing-license-key-authentication/)
to simplify client-side integrations, and we recommend [License Authentication](https://keygen.sh/docs/api/authentication/#license-authentication)
for the majority of client-side integrations.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-activation-tokens-permissions) Required permissions

- license.tokens.generate

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-activation-tokens-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-activation-tokens-auths-bearer) Bearer

required



An authentication token with privileges to create tokens for the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-activation-tokens-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-activation-tokens-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-activation-tokens-params-id) <id>

stringrequired



The identifier (UUID) or key of the license the token is for.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-activation-tokens-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-activation-tokens-attrs-name) data.attributes.name

stringoptional



An optional name for the token. This can be used to easily identify tokens at a glance.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-activation-tokens-attrs-expiry) data.attributes.expiry

timestamp (iso8601)optional



The timestamp for when the token expires. Requests using an expired token will be rejected.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-activation-tokens-attrs-permissions) data.attributes.permissions

array<string>default=\["\*"\]



The permissions for the token. Available permissions, dependent on the bearer, are covered [here](https://keygen.sh/docs/api/authorization/#authorization-permissions). By default, it is set to a wildcard `*`, which inherits all permissions from the token bearer.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-activation-tokens-attrs-maxActivations) data.attributes.maxActivations

integeroptional



The maximum number of machine activations the token is allowed to perform. If this is `null`, the token will not have an activation limit.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-activation-tokens-attrs-maxDeactivations) data.attributes.maxDeactivations

integeroptional



The maximum number of machine deactivations the token is allowed to perform. If this is `null`, the token will not have a deactivation limit.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-activation-tokens-returns) Returns

A `200 OK` response will be returned along with the new license token.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/tokens
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/tokens
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "tokens",
      "attributes": {
        "maxActivations": 2
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "tokens",
      "attributes": {
        "maxActivations": 2
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "tokens",
      "attributes": {
        "maxActivations": 2
      }
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "tokens",
      "attributes": {
        "maxActivations": 2
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "tokens",\
      "attributes": [\
        "maxActivations": 2\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "tokens",\
      "attributes": [\
        "maxActivations": 2\
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "tokens",
    attributes = new {
      maxActivations = 2
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "tokens",
    attributes = new {
      maxActivations = 2
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "tokens",
    "attributes" to mapOf(
      "maxActivations" to 2
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens")
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
    "type" to "tokens",
    "attributes" to mapOf(
      "maxActivations" to 2
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens")
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
    entry("type", "tokens"),
    entry("attributes", ofEntries(
      entry("maxActivations", 2)
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens")
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
    entry("type", "tokens"),
    entry("attributes", ofEntries(
      entry("maxActivations", 2)
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens")
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
attrs["maxActivations"] = value::number(2);

value data;
data["type"] = value::string("tokens");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens");
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
attrs["maxActivations"] = value::number(2);

value data;
data["type"] = value::string("tokens");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "tokens",
          "attributes": {
            "maxActivations": 2
          }
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "tokens",
          "attributes": {
            "maxActivations": 2
          }
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "8ae9291c-46f7-48f9-b115-eb406ef01b1b",
    "type": "tokens",
    "attributes": {
      "kind": "activation-token",
      "token": "activ-70c5a0266f9f47423454d6ba1e4faeb1v3",
      "expiry": null,
      "permissions": ["license.read", "license.validate", "machine.create"],
      "maxActivations": 2,
      "activations": 0,
      "maxDeactivations": null,
      "deactivations": 0,
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
        },
        "data": {
          "type": "licenses",
          "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827"
        }
      }
    }
  }
}
{
  "data": {
    "id": "8ae9291c-46f7-48f9-b115-eb406ef01b1b",
    "type": "tokens",
    "attributes": {
      "kind": "activation-token",
      "token": "activ-70c5a0266f9f47423454d6ba1e4faeb1v3",
      "expiry": null,
      "permissions": ["license.read", "license.validate", "machine.create"],
      "maxActivations": 2,
      "activations": 0,
      "maxDeactivations": null,
      "deactivations": 0,
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
        },
        "data": {
          "type": "licenses",
          "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-relationships-attach-users) Attach users

Attach users to a license. This will immediately be taken into effect
for all future validations. Attaching a user to a license allows that
user access to the license, and depending on permissions, the ability
to perform actions for the license, such as machine activation
and deactivation.

**Below are the limitations to attaching a user:**

- You cannot attach a user that is already attached as the owner.
- You cannot attach an already attached user.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attack-users-permissions) Required permissions

- license.users.attach

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attach-users-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attach-users-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, the product it belongs to, or the owner of the license (when permitted).


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attach-users-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attach-users-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attach-users-params-id) <id>

stringrequired



The identifier (UUID) or key of the license to be updated.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attach-users-returns) Returns

A `201 Created` response will be returned along with an array of license user objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/users
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/users
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": [\
      {\
        "type": "users",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": [\
      {\
        "type": "users",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": [\
      {\
        "type": "users",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": [\
      {\
        "type": "users",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      [\
        "type": "users",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      [\
        "type": "users",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = [\
    new {\
      type = "users",\
      id = "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
    }\
  ]
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = [\
    new {\
      type = "users",\
      id = "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
    }\
  ]
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to listOf(
    mapOf(
      "type" to "users",
      "id" to "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to listOf(
    mapOf(
      "type" to "users",
      "id" to "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users")
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
  entry("data", of(
    ofEntries(
      entry("type", "users"),
      entry("id", "57f1ceb4-6bf4-44dd-8967-de88364bf9eb")
    )
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users")
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
  entry("data", of(
    ofEntries(
      entry("type", "users"),
      entry("id", "57f1ceb4-6bf4-44dd-8967-de88364bf9eb")
    )
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users")
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

value entl;
entl["type"] = value::string("users");
entl["id"] = value::string("57f1ceb4-6bf4-44dd-8967-de88364bf9eb");

value data = value::array(1);
data[0] = entl;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users");
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

value entl;
entl["type"] = value::string("users");
entl["id"] = value::string("57f1ceb4-6bf4-44dd-8967-de88364bf9eb");

value data = value::array(1);
data[0] = entl;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": [\
          {\
            "type": "users",\
            "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          }\
        ]
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": [\
          {\
            "type": "users",\
            "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          }\
        ]
      }'
content_copy
```

#### Example response / 201 Created

```
{
  "data": [\
    {\
      "id": "14fb3e6a-2b30-42b4-b2ff-06ca2e6c0608",\
      "type": "license-users",\
      "attributes": {\
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
        "license": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"\
          },\
          "data": {\
            "type": "licenses",\
            "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827"\
          }\
        },\
        "user": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          },\
          "data": {\
            "type": "users",\
            "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          }\
        },\
      },\
      "links": {\
        "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users/57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    }\
  ]
}
{
  "data": [\
    {\
      "id": "14fb3e6a-2b30-42b4-b2ff-06ca2e6c0608",\
      "type": "license-users",\
      "attributes": {\
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
        "license": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"\
          },\
          "data": {\
            "type": "licenses",\
            "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827"\
          }\
        },\
        "user": {\
          "links": {\
            "related": "/v1/accounts/<account>/users/57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          },\
          "data": {\
            "type": "users",\
            "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          }\
        },\
      },\
      "links": {\
        "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users/57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    }\
  ]
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-relationships-detach-users) Detach users

Detach users from a license. This will immediately be taken into effect
for all future validations and the user will no longer have access to
the license or its machines. In addition, any machines that the user
owns for the license will be detached from the user, i.e. the machine's
owner will be nullified, but the machine will remain activated.

**Below are the limitations to detaching a user:**

- You cannot detach a user that is attached as the owner.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-users-permissions) Required permissions

- license.users.detach

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-users-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-users-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, the product it belongs to, or the owner of the license (when permitted).


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-users-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-users-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-users-params-id) <id>

stringrequired



The identifier (UUID) or key of the license to be updated.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-users-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/users
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/users
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": [\
      {\
        "type": "users",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": [\
      {\
        "type": "users",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": [\
      {\
        "type": "users",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
).json()
import requests
import json

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": [\
      {\
        "type": "users",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users",
  method: .delete,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      [\
        "type": "users",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users",
  method: .delete,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      [\
        "type": "users",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users",
  Method.DELETE
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = [\
    new {\
      type = "users",\
      id = "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
    }\
  ]
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users",
  Method.DELETE
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = [\
    new {\
      type = "users",\
      id = "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
    }\
  ]
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to listOf(
    mapOf(
      "type" to "users",
      "id" to "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"
    )
  )
))

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to listOf(
    mapOf(
      "type" to "users",
      "id" to "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"
    )
  )
))

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users")
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
  entry("data", of(
    ofEntries(
      entry("type", "users"),
      entry("id", "57f1ceb4-6bf4-44dd-8967-de88364bf9eb")
    )
  ))
));

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users")
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
  entry("data", of(
    ofEntries(
      entry("type", "users"),
      entry("id", "57f1ceb4-6bf4-44dd-8967-de88364bf9eb")
    )
  ))
));

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users")
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

value entl;
entl["type"] = value::string("users");
entl["id"] = value::string("57f1ceb4-6bf4-44dd-8967-de88364bf9eb");

value data = value::array(1);
data[0] = entl;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users");
req.set_method(methods::DELETE);
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

value entl;
entl["type"] = value::string("users");
entl["id"] = value::string("57f1ceb4-6bf4-44dd-8967-de88364bf9eb");

value data = value::array(1);
data[0] = entl;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users");
req.set_method(methods::DELETE);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": [\
          {\
            "type": "users",\
            "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          }\
        ]
      }'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": [\
          {\
            "type": "users",\
            "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          }\
        ]
      }'
content_copy
```

#### Example response / 204 No Content

```
No Content
No Content
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-relationships-list-users) List users

Returns a list of users attached to the license. The users are returned sorted by
creation date, with the most recent users appearing first. The listed users include
all users attached to the license, in addition to the license's owner.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-users-permissions) Required permissions

- user.read

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-users-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-users-auths-bearer) Bearer

required



An authentication token with privileges to view the resource: either an admin, the product it belongs to, the license itself (when permitted), or the owner or a user of the license (when permitted).


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-users-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-users-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-users-params-id) <id>

stringrequired



The identifier (UUID) or key of the license to list users for.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-users-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-users-query-limit) limit

integerdefault=10



A limit on the number of users to be returned. Limit must be a number between 1 and 100.





```
/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users?limit=25
/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users?limit=25
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-users-query-page) page

object<string, integer>



Object containing page `size` and page `number`. Page size must be a number between 1 and 100.





```
/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users?page[size]=15&page[number]=2
/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users?page[size]=15&page[number]=2
```


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-users-returns) Returns

A `200 OK` response will be returned along with a list of user objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/users
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/users
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users?limit=15", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users?limit=15", {
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
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users?limit=15",
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

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users")
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

uri_builder uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users");
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

uri_builder uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users");
uri.append_query("limit", 15);

req.set_request_uri(uri.to_uri());
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users?limit=15 -g \
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
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-relationships-attach-entitlements) Attach license entitlements

Attach entitlements to a license. This will immediately be taken into effect
for all future validations.

**Below are the limitations to attaching an entitlement:**

- You cannot attach an entitlement that is already attached through the policy.
- You cannot attach an already attached entitlement.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attach-entitlements-permissions) Required permissions

- license.entitlements.attach

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attach-entitlements-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attach-entitlements-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attach-entitlements-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attach-entitlements-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attach-entitlements-params-id) <id>

stringrequired



The identifier (UUID) or key of the license to be updated.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-attach-entitlements-returns) Returns

A `201 Created` response will be returned along with an array of license entitlement objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/entitlements
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/entitlements
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": [\
      {\
        "type": "entitlements",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": [\
      {\
        "type": "entitlements",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": [\
      {\
        "type": "entitlements",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": [\
      {\
        "type": "entitlements",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      [\
        "type": "entitlements",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      [\
        "type": "entitlements",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = [\
    new {\
      type = "entitlements",\
      id = "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
    }\
  ]
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements",
  Method.POST
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = [\
    new {\
      type = "entitlements",\
      id = "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
    }\
  ]
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to listOf(
    mapOf(
      "type" to "entitlements",
      "id" to "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to listOf(
    mapOf(
      "type" to "entitlements",
      "id" to "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements")
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
  entry("data", of(
    ofEntries(
      entry("type", "entitlements"),
      entry("id", "57f1ceb4-6bf4-44dd-8967-de88364bf9eb")
    )
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements")
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
  entry("data", of(
    ofEntries(
      entry("type", "entitlements"),
      entry("id", "57f1ceb4-6bf4-44dd-8967-de88364bf9eb")
    )
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements")
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

value entl;
entl["type"] = value::string("entitlements");
entl["id"] = value::string("57f1ceb4-6bf4-44dd-8967-de88364bf9eb");

value data = value::array(1);
data[0] = entl;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements");
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

value entl;
entl["type"] = value::string("entitlements");
entl["id"] = value::string("57f1ceb4-6bf4-44dd-8967-de88364bf9eb");

value data = value::array(1);
data[0] = entl;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": [\
          {\
            "type": "entitlements",\
            "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          }\
        ]
      }'
curl -X POST https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": [\
          {\
            "type": "entitlements",\
            "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          }\
        ]
      }'
content_copy
```

#### Example response / 201 Created

```
{
  "data": [\
    {\
      "id": "14fb3e6a-2b30-42b4-b2ff-06ca2e6c0608",\
      "type": "license-entitlements",\
      "attributes": {\
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
        "entitlement": {\
          "links": {\
            "related": "/v1/accounts/<account>/entitlements/57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          },\
          "data": {\
            "type": "entitlements",\
            "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          }\
        },\
        "license": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"\
          },\
          "data": {\
            "type": "licenses",\
            "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827"\
          }\
        }\
      },\
      "links": {\
        "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements/57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    }\
  ]
}
{
  "data": [\
    {\
      "id": "14fb3e6a-2b30-42b4-b2ff-06ca2e6c0608",\
      "type": "license-entitlements",\
      "attributes": {\
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
        "entitlement": {\
          "links": {\
            "related": "/v1/accounts/<account>/entitlements/57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          },\
          "data": {\
            "type": "entitlements",\
            "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          }\
        },\
        "license": {\
          "links": {\
            "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"\
          },\
          "data": {\
            "type": "licenses",\
            "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827"\
          }\
        }\
      },\
      "links": {\
        "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements/57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    }\
  ]
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-relationships-detach-entitlements) Detach license entitlements

Detach entitlements from a license. This will immediately be taken into effect
for all future validations.

**Below are the limitations to detaching an entitlement:**

- You cannot detach an entitlement that is attached through the policy.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-entitlements-permissions) Required permissions

- license.entitlements.detach

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-entitlements-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-entitlements-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-entitlements-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-entitlements-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-entitlements-params-id) <id>

stringrequired



The identifier (UUID) or key of the license to be updated.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-detach-entitlements-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/entitlements
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/entitlements
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": [\
      {\
        "type": "entitlements",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": [\
      {\
        "type": "entitlements",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": [\
      {\
        "type": "entitlements",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
).json()
import requests
import json

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": [\
      {\
        "type": "entitlements",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    ]
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements",
  method: .delete,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      [\
        "type": "entitlements",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements",
  method: .delete,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      [\
        "type": "entitlements",\
        "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements",
  Method.DELETE
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = [\
    new {\
      type = "entitlements",\
      id = "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
    }\
  ]
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements",
  Method.DELETE
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = [\
    new {\
      type = "entitlements",\
      id = "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
    }\
  ]
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to listOf(
    mapOf(
      "type" to "entitlements",
      "id" to "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"
    )
  )
))

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements")
  .header("Authorization", "Bearer <token>")
  .header("Content-Type", "application/vnd.api+json")
  .header("Accept", "application/vnd.api+json")
  .body(body)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to listOf(
    mapOf(
      "type" to "entitlements",
      "id" to "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"
    )
  )
))

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements")
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
  entry("data", of(
    ofEntries(
      entry("type", "entitlements"),
      entry("id", "57f1ceb4-6bf4-44dd-8967-de88364bf9eb")
    )
  ))
));

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements")
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
  entry("data", of(
    ofEntries(
      entry("type", "entitlements"),
      entry("id", "57f1ceb4-6bf4-44dd-8967-de88364bf9eb")
    )
  ))
));

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements")
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

value entl;
entl["type"] = value::string("entitlements");
entl["id"] = value::string("57f1ceb4-6bf4-44dd-8967-de88364bf9eb");

value data = value::array(1);
data[0] = entl;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements");
req.set_method(methods::DELETE);
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

value entl;
entl["type"] = value::string("entitlements");
entl["id"] = value::string("57f1ceb4-6bf4-44dd-8967-de88364bf9eb");

value data = value::array(1);
data[0] = entl;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements");
req.set_method(methods::DELETE);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": [\
          {\
            "type": "entitlements",\
            "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          }\
        ]
      }'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": [\
          {\
            "type": "entitlements",\
            "id": "57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
          }\
        ]
      }'
content_copy
```

#### Example response / 204 No Content

```
No Content
No Content
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-relationships-list-entitlements) List license entitlements

Returns a list of entitlements attached to the license. The entitlements are returned sorted by
creation date, with the most recent entitlements appearing first. The listed entitlements
include all entitlements attached to the license's policy, in addition to the entitlements
attached to the particular license.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-entitlements-permissions) Required permissions

- entitlement.read

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-entitlements-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-entitlements-auths-bearer) Bearer

required



An authentication token with privileges to view the resource: either an admin, the product it belongs to, the license itself (via license key or a license token), or the user it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-entitlements-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-entitlements-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-entitlements-params-id) <id>

stringrequired



The identifier (UUID) or key of the license to list entitlements for.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-entitlements-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-entitlements-query-limit) limit

integerdefault=10



A limit on the number of entitlements to be returned. Limit must be a number between 1 and 100.





```
/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements?limit=25
/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements?limit=25
```

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-entitlements-query-page) page

object<string, integer>



Object containing page `size` and page `number`. Page size must be a number between 1 and 100.





```
/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements?page[size]=15&page[number]=2
/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements?page[size]=15&page[number]=2
```


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-list-entitlements-returns) Returns

A `200 OK` response will be returned along with a list of entitlement objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/entitlements
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/entitlements
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements?limit=15", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements?limit=15", {
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
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("entitlements", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("entitlements", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements")
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

uri_builder uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements");
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

uri_builder uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements");
uri.append_query("limit", 15);

req.set_request_uri(uri.to_uri());
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": [\
    {\
      "id": "db1ff21b-f42f-4623-952b-ca7f2600bded",\
      "type": "entitlements",\
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
        "self": "/v1/accounts/<account>/entitlements/db1ff21b-f42f-4623-952b-ca7f2600bded"\
      }\
    },\
    …\
  ]
}
{
  "data": [\
    {\
      "id": "db1ff21b-f42f-4623-952b-ca7f2600bded",\
      "type": "entitlements",\
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
        "self": "/v1/accounts/<account>/entitlements/db1ff21b-f42f-4623-952b-ca7f2600bded"\
      }\
    },\
    …\
  ]
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-relationships-change-policy) Change policy

Change a license's policy relationship. This will immediately be taken into effect
for all future validations. The license's expiry may be changed, according to the
new policy's transfer strategy.

**Below are the limitations to changing a license's policy:**

- You cannot change from an encrypted policy to an unencrypted policy (or vice-versa).
- You cannot change from a pooled policy to an unpooled policy (or vice-versa).
- You cannot change to a policy that has a less strict fingerprint strategy.
- You cannot change to a policy that has a different cryptographic scheme.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-policy-permissions) Required permissions

- license.policy.update

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-policy-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-policy-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, the product it belongs to, or if the license's policy is unprotected, the user it belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-policy-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-policy-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-policy-params-id) <id>

stringrequired



The identifier (UUID) or key of the license to be updated.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-policy-returns) Returns

A `200 OK` response will be returned along with the updated license object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/policy
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/policy
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy", {
  method: "PUT",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "policies",
      "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy", {
  method: "PUT",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "policies",
      "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.put(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "policies",
      "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
    }
  })
).json()
import requests
import json

res = requests.put(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "policies",
      "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy",
  method: .put,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "policies",\
      "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy",
  method: .put,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "policies",\
      "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy",
  Method.PUT
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "policies",
    id = "70af414d-6152-4ff1-892b-15a40ada6b4e"
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy",
  Method.PUT
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "policies",
    id = "70af414d-6152-4ff1-892b-15a40ada6b4e"
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "policies",
    "id" to "70af414d-6152-4ff1-892b-15a40ada6b4e"
  )
))

val res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy")
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
    "type" to "policies",
    "id" to "70af414d-6152-4ff1-892b-15a40ada6b4e"
  )
))

val res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy")
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
    entry("type", "policies"),
    entry("id", "70af414d-6152-4ff1-892b-15a40ada6b4e")
  ))
));

HttpResponse<JsonNode> res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy")
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
    entry("type", "policies"),
    entry("id", "70af414d-6152-4ff1-892b-15a40ada6b4e")
  ))
));

HttpResponse<JsonNode> res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy")
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
data["type"] = value::string("policies");
data["id"] = value::string("70af414d-6152-4ff1-892b-15a40ada6b4e");

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy");
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
data["type"] = value::string("policies");
data["id"] = value::string("70af414d-6152-4ff1-892b-15a40ada6b4e");

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy");
req.set_method(methods::PUT);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PUT https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      }'
curl -X PUT https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 1,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 1,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "e8bf27c0-5f9c-4135-a65c-f52706c5fd4c"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-relationships-change-owner) Change owner

Change a license's owner relationship. This will immediately transfer the license
resource to the new owner.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-owner-permissions) Required permissions

- license.owner.update

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-owner-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-owner-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product the license belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-owner-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-owner-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-owner-params-id) <id>

stringrequired



The identifier (UUID) or key of the license to be updated.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-owner-returns) Returns

A `200 OK` response will be returned along with the updated license object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/owner
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/owner
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner", {
  method: "PUT",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "users",
      "id": "192bd216-58cc-47a8-bd2d-667e0b729c43"
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner", {
  method: "PUT",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "users",
      "id": "192bd216-58cc-47a8-bd2d-667e0b729c43"
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.put(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "users",
      "id": "192bd216-58cc-47a8-bd2d-667e0b729c43"
    }
  })
).json()
import requests
import json

res = requests.put(
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "users",
      "id": "192bd216-58cc-47a8-bd2d-667e0b729c43"
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner",
  method: .put,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "users",\
      "id": "192bd216-58cc-47a8-bd2d-667e0b729c43"\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner",
  method: .put,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "users",\
      "id": "192bd216-58cc-47a8-bd2d-667e0b729c43"\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner",
  Method.PUT
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "users",
    id = "192bd216-58cc-47a8-bd2d-667e0b729c43"
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner",
  Method.PUT
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "users",
    id = "192bd216-58cc-47a8-bd2d-667e0b729c43"
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "users",
    "id" to "192bd216-58cc-47a8-bd2d-667e0b729c43"
  )
))

val res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner")
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
    "id" to "192bd216-58cc-47a8-bd2d-667e0b729c43"
  )
))

val res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner")
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
    entry("id", "192bd216-58cc-47a8-bd2d-667e0b729c43")
  ))
));

HttpResponse<JsonNode> res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner")
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
    entry("id", "192bd216-58cc-47a8-bd2d-667e0b729c43")
  ))
));

HttpResponse<JsonNode> res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner")
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
data["id"] = value::string("192bd216-58cc-47a8-bd2d-667e0b729c43");

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner");
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
data["id"] = value::string("192bd216-58cc-47a8-bd2d-667e0b729c43");

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner");
req.set_method(methods::PUT);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PUT https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "users",
          "id": "192bd216-58cc-47a8-bd2d-667e0b729c43"
        }
      }'
curl -X PUT https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "users",
          "id": "192bd216-58cc-47a8-bd2d-667e0b729c43"
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 1,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "192bd216-58cc-47a8-bd2d-667e0b729c43"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 1,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": null
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": {
          "type": "users",
          "id": "192bd216-58cc-47a8-bd2d-667e0b729c43"
        }
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-relationships-change-group) Change group

Change a license's group relationship. This will immediately transfer the license
resource to the new group. Changing the license's group will not retroactively
change the group of its user or of its machines.

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-group-permissions) Required permissions

- license.group.update

### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-group-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-group-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product the license belongs to.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-group-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-group-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-group-params-id) <id>

stringrequired



The identifier (UUID) or key of the license to be updated.


### [_link_](https://keygen.sh/docs/api/licenses/\#licenses-change-group-returns) Returns

A `200 OK` response will be returned along with the updated license object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/group
https://api.keygen.sh/v1/accounts/<account>/licenses/<id>/group
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group", {
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

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group", {
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
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group",
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
  "https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group",
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group",
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
  "licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group",
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

val res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group")
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

val res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group")
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

HttpResponse<JsonNode> res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group")
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

HttpResponse<JsonNode> res = Unirest.put("https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group")
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group");
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

req.set_request_uri("/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group");
req.set_method(methods::PUT);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PUT https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "groups",
          "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
        }
      }'
curl -X PUT https://api.keygen.sh/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group \
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
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 1,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": {
          "type": "groups",
          "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
        }
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": null
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "b18e3f3a-330c-4d8d-ae2e-014db21fa827",
    "type": "licenses",
    "links": {
      "self": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827"
    },
    "attributes": {
      "name": null,
      "key": "6DFB15-6597FC-B7DBB6-E34DAB-9D77C0-V3",
      "expiry": "2020-01-01T00:00:00.000Z",
      "status": "ACTIVE",
      "uses": 0,
      "protected": false,
      "version": "1.0.0",
      "suspended": false,
      "scheme": null,
      "encrypted": false,
      "floating": false,
      "strict": false,
      "maxMachines": 1,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": 64,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "requireHeartbeat": false,
      "requireCheckIn": false,
      "lastValidated": "2021-03-15T19:27:50.440Z",
      "lastCheckOut": null,
      "lastCheckIn": null,
      "nextCheckIn": null,
      "permissions": ["license.read", "license.validate", ...],
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
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/product"
        },
        "data": {
          "type": "products",
          "id": "eb4e14a7-ea41-4ede-b3fe-5e835c17156b"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/policy"
        },
        "data": {
          "type": "policies",
          "id": "70af414d-6152-4ff1-892b-15a40ada6b4e"
        }
      },
      "group": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/group"
        },
        "data": {
          "type": "groups",
          "id": "db7e99e1-dd6d-447b-98e8-ceb354d9d85d"
        }
      },
      "owner": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/owner"
        },
        "data": null
      },
      "users": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/users"
        },
        "meta": {
          "count": 0
        }
      },
      "machines": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/machines"
        },
        "meta": {
          "count": 0
        }
      },
      "tokens": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/tokens"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/licenses/b18e3f3a-330c-4d8d-ae2e-014db21fa827/entitlements"
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