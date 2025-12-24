# [_link_](https://keygen.sh/docs/api/policies/\#policies) Policies

#### [_link_](https://keygen.sh/docs/api/policies/\#policies-toc) Table of contents

1. [The policy object](https://keygen.sh/docs/api/policies/#policies-object)
2. [Create a policy](https://keygen.sh/docs/api/policies/#policies-create)
3. [Retrieve a policy](https://keygen.sh/docs/api/policies/#policies-retrieve)
4. [Update a policy](https://keygen.sh/docs/api/policies/#policies-update)
5. [Delete a policy](https://keygen.sh/docs/api/policies/#policies-delete)
6. [List all policies](https://keygen.sh/docs/api/policies/#policies-list)
7. [Attach entitlements](https://keygen.sh/docs/api/policies/#policies-relationships-attach-entitlements)
8. [Detach entitlements](https://keygen.sh/docs/api/policies/#policies-relationships-detach-entitlements)
9. [List entitlements](https://keygen.sh/docs/api/policies/#policies-relationships-list-entitlements)

## [_link_](https://keygen.sh/docs/api/policies/\#policies-object) The policy object

Below you will find the various attributes for the policy resource, as well
as the policy resource's relationships. Your policies define the different
types of licenses that a given product offers. For example, you may offer
yearly licenses, as well as shorter time-limited free trial licenses that
lack certain entitlements.

Another example would be configuring a yearly software license that once
expired, still functions normally, but is disallowed release upgrades
after expiration. This is something you can accomplish using policies.

### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-name) data.attributes.name

string



The name of the policy.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-duration) data.attributes.duration

integer



The duration for the policy in seconds. When a new license implements the policy, the license's expiry is calculated with this value (i.e. `time.now + policy.duration`). If `null`, licenses will never expire.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-strict) data.attributes.strict

booleandefault=false



When enabled, a license that implements the policy may be considered invalid if its machine limit, machine core, memory, or disk limits, or machine processes limit is surpassed, according to the policy's overage strategy. In addition, strict requires a license to have at least 1 machine associated with it in order to pass validation.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-floating) data.attributes.floating

booleandefault=false



When enabled, a license that implements the policy will be valid across multiple machines. Though this is not enforced i.e. it does not invalidate a license if it's associated with more than 1 machine unless the policy is strict.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-scheme) data.attributes.scheme

string



The cryptographic encryption/signature scheme used on license keys. Can be used to implement offline licensing by storing tamper-proof data within a license's key. When `null` or omitted, the license's key will be stored unchanged.



Even though we're signing or encrypting license keys, that doesn't mean the value you specify is hidden. Keep in mind that the contents of the keys are usually base64url encoded (using [RFC 4648](https://tools.ietf.org/html/rfc4648), a URL-safe version of base64 which is supported in most programming languages), meaning they are publicly readable if decoded. For more info, see the [signature section](https://keygen.sh/docs/api/signatures/). **Do not store sensitive information within keys, as the contents can be read by decoding the key.**



###### Options



- `ED25519_SIGN`: Sign license keys with your account's Ed25519 signing key, using elliptic curve cryptography and SHA512. The given license key data will be base64url encoded and then prefixed with `key/` before signing, and the signing data's signature will be base64url encoded and then appended onto the end of the signing data, delimited by the `.` character, e.g. `key/{URLBASE64URL_KEY}.{URLBASE64URL_SIGNATURE}`. This is our recommended signing scheme, but it may not be supported in your preferred programming language.
- `ECDSA_P256_SIGN`: Sign license keys with your account's ECDSA private key, using ECDSA over P-256 (aka secp256r1 and prime256v1). The given license key data will be base64url encoded and then prefixed with `key/` before signing, and the signing data's signature will be base64url encoded and then appended onto the end of the signing data, delimited by the `.` character, e.g. `key/{URLBASE64URL_KEY}.{URLBASE64URL_SIGNATURE}`. This is our recommended signing scheme for NIST FIPS 140-3 compliance.
- `RSA_2048_PKCS1_PSS_SIGN_V2`: Sign license keys with your account's 2048-bit RSA private key using RSA PKCS1-PSS padding, with a SHA256 digest, max salt length, and a SHA256 MGF1. The provided embedded dataset will be base64url encoded and then prefixed with `key/` before signing, and the signing data's signature will be base64url encoded and then appended onto the end of the signing data, delimited by the `.` character, e.g. `key/{URLBASE64URL_KEY}.{URLBASE64URL_SIGNATURE}`, resulting in the final key. This is our recommended RSA scheme, but it may not be supported in your preferred programming language.
- `RSA_2048_PKCS1_SIGN_V2`: Sign license keys with your account's 2048-bit RSA private key using RSA PKCS1 v1.5 padding, with a SHA256 digest. The provided embedded dataset will be base64url encoded and then prefixed with `key/` before signing, and the signing data's signature will be base64url encoded and then appended onto the end of the signing data, delimited by the `.` character, e.g. `key/{URLBASE64URL_KEY}.{URLBASE64URL_SIGNATURE}`, resulting in the final key.
- `RSA_2048_PKCS1_ENCRYPT`: Encrypt license keys with your account's 2048-bit RSA private key using RSA PKCS1 v1.5 padding. The provided dataset will be encrypted using your account's private key and then base64url encoded, resulting in the final key. The key can be decrypted using your account's public key. The key must contain no more than `245` bytes (please note this is _byte length_ not _string length_).
- `RSA_2048_JWT_RS256`: Encode a license claims payload into a JWT using the RS256 algorithm. The license key must be a valid JWT claims payload (i.e. a JSON encoded string). The JWT will be signed using your account's 2048-bit RSA private key and can be verified using your account's public key. The resulting key will be a full JSON Web Token. We do not modify your claims payload.
- `RSA_2048_PKCS1_PSS_SIGN`: **Deprecated: use v2.** Sign license keys with your account's 2048-bit RSA private key using RSA PKCS1-PSS padding, with a SHA256 digest, max salt length, and a SHA256 MGF1. The provided embedded dataset will be base64url encoded, and its signature will be base64url encoded and then appended onto the end of the encoded key, delimited by the `.` character, e.g. `{URLBASE64URL_KEY}.{URLBASE64URL_SIGNATURE}`, resulting in the final key.
- `RSA_2048_PKCS1_SIGN`: **Deprecated: use v2.** Sign license keys with your account's 2048-bit RSA private key using RSA PKCS1 v1.5 padding, with a SHA256 digest. The provided embedded dataset will be base64url encoded, and its signature will be base64url encoded and then appended onto the end of the encoded key, delimited by the `.` character, e.g. `{URLBASE64URL_KEY}.{URLBASE64URL_SIGNATURE}`, resulting in the final key.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-requireProductScope) data.attributes.requireProductScope

booleandefault=false



When enabled, validating a license that implements the policy will require a product scope that matches the licenses's product relationship by its identifier (UUID).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-requirePolicyScope) data.attributes.requirePolicyScope

booleandefault=false



When enabled, validating a license that implements the policy will require a policy scope that matches the licenses's policy relationship by its identifier (UUID).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-requireMachineScope) data.attributes.requireMachineScope

booleandefault=false



When enabled, validating a license that implements the policy will require a machine scope that matches at least 1 of the licenses's machine relationships by its identifier (UUID).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-requireFingerprintScope) data.attributes.requireFingerprintScope

booleandefault=false



When enabled, validating a license that implements the policy will require a fingerprint scope that matches at least 1 of the licenses's machine relationships by its fingerprint.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-requireComponentsScope) data.attributes.requireComponentsScope

booleandefault=false



When enabled, validating a license that implements the policy will require a components scope that matches at least 1 of the licenses's machine components by its fingerprint.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-requireUserScope) data.attributes.requireUserScope

booleandefault=false



When enabled, validating a license that implements the policy will require a user scope that matches the license's user relationship.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-requireChecksumScope) data.attributes.requireChecksumScope

booleandefault=false



When enabled, validating a license that implements the policy will require a checksum scope to be provided, matching an accessible artifact for the license.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-requireVersionScope) data.attributes.requireVersionScope

booleandefault=false



When enabled, validating a license that implements the policy will require a version scope to be provided, matching an accessible release for the license.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-requireCheckIn) data.attributes.requireCheckIn

booleandefault=false



When enabled, a license that implements the policy will require check-in at a predefined interval to continue to pass validation i.e. if a license misses a check-in, it will be invalidated.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-checkInInterval) data.attributes.checkInInterval

string



One of `day`, `week`, `month` or `year`. The frequency at which a license should check-in.



###### Options



- `day`: Require a license implementing the policy to check-in at least once every day to remain valid.
- `week`: Require a license implementing the policy to check-in at least once every week to remain valid.
- `month`: Require a license implementing the policy to check-in at least once every month to remain valid.
- `year`: Require a license implementing the policy to check-in at least once every year to remain valid.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-checkInIntervalCount) data.attributes.checkInIntervalCount

integer



The number of intervals (specified in the check-in interval property) between each required check-in. For example, `checkInInterval=week` and `checkInIntervalCount=2` requires check-in every 2 weeks. Must be a number between 1 and 365 inclusive.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-usePool) data.attributes.usePool

booleandefault=false



Whether or not to pull license keys from a finite pool of pre-determined keys. This is useful for invite-only programs such as a private beta, when you need a limited set of licenses, or when you want to define the keys manually. This cannot be changed later on.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-maxMachines) data.attributes.maxMachines

integer



The maximum number of machines a license implementing the policy can have associated with it. This is only enforced when the policy is strict. When `null`, an unlimited number of machines may be associated with a license if the policy is floating. Must be a number greater than 0, and must be equal to 1 for non-floating policies.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-maxProcesses) data.attributes.maxProcesses

integer



The maximum number of machine processes a license implementing the policy can have associated with it, also depending on the policy's leasing strategy. When `null`, an unlimited number of machine processes may be associated with a license. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-maxUsers) data.attributes.maxUsers

integer



The maximum number of users a license implementing the policy can have associated with it. When `null`, an unlimited number of users may be associated with a license. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-maxCores) data.attributes.maxCores

integer



The maximum number of machine CPU cores a license implementing the policy can have associated with it. The count is the sum of all cores for a license's machines. When `null`, a license which implements the policy can have an unlimited number of CPU cores.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-maxMemory) data.attributes.maxMemory

integer



The maximum amount of machine memory, in bytes, a license implementing the policy can have associated with it. The count is the sum of all memory across a license's machines. When `null`, a license which implements the policy can consume unlimited memory.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-maxDisk) data.attributes.maxDisk

integer



The maximum amount of machine disk, in bytes, a license implementing the policy can have associated with it. The count is the sum of all disk across a license's machines. When `null`, a license which implements the policy can consume unlimited disk.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-maxUses) data.attributes.maxUses

integer



The maximum number of uses a license implementing the policy can have. Cannot exceed `2,147,483,647`, which is the maximum value of a 4 byte integer. When `null`, a license which implements the policy can have an unlimited number of uses. This attribute is not taken into account during license validation. See the license's usage-related actions for more details.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-protected) data.attributes.protected

booleandefault=inherited



Whether or not the policy is protected. A protected policy disallows users the ability to create and manage licenses themselves, useful in situations where Keygen is only managed server-side or when you aren't listening for the appropriate user-initiated webhook events. If the account is protected, all policies automatically inherit that value when left blank.



Unprotected policies are particularly useful for trial policies alongside user profiles, since they allow a user to create a license implementing the unprotected trial policy, but the user cannot create or transfer a license to a protected paid policy. Upgrades then, from trial to paid, would need to be handled server-side, e.g. after an event from your payment provider.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-requireHeartbeat) data.attributes.requireHeartbeat

booleandefault=false



Whether or not the policy requires its machines to maintain a heartbeat. When enabled, machines that do not have a heartbeat will fail validation with a `HEARTBEAT_NOT_STARTED` validation code. In addition, when enabled, new machines will automatically have their first heartbeat set upon creation. When disabled, heartbeats are optional.



Please note: this only applies to machines, not processes. Processes always require a heartbeat.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-heartbeatDuration) data.attributes.heartbeatDuration

integer



The heartbeat duration for the policy, in seconds. When a machine has an active heartbeat monitor, the machine must send heartbeat pings within this timeframe to remain activated. Must be greater than or equal to 1 minute (60).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-heartbeatCullStrategy) data.attributes.heartbeatCullStrategy

stringdefault=DEACTIVATE\_DEAD



The strategy used for culling dead machines and processes.



Please note: dead machines will not pass license validation. The resulting failed validation code will be `HEARTBEAT_DEAD`.



###### Options



- `DEACTIVATE_DEAD`: Automatically deactivate machines that fail to maintain their heartbeat pings. This is the default.
- `KEEP_DEAD`: Mark machines that fail to maintain their heartbeat pings as dead, but do not deactivate.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-heartbeatResurrectionStrategy) data.attributes.heartbeatResurrectionStrategy

stringdefault=NO\_REVIVE



The strategy used for controlling whether or not dead machines and processes can be resurrected shortly after death. A resurrection occurs when a heartbeat ping is sent to a dead machine or process that is within its resurrection window.



Please note: dead machines will not pass license validation. The resulting failed validation code will be `HEARTBEAT_DEAD`.



###### Options



- `NO_REVIVE`: Do not allow dead machines and processes to be revived. This is the default.
- `1_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 1 minute from its time of death.
- `2_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 2 minutes from its time of death.
- `5_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 5 minutes from its time of death.
- `10_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 10 minutes from its time of death.
- `15_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 15 minutes from its time of death.
- `ALWAYS_REVIVE`: A machine or process can always be revived. Requires a cull strategy of `KEEP_DEAD`.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-heartbeatBasis) data.attributes.heartbeatBasis

stringdefault=varies



Control when a machine's initial heartbeat is started. By default, a machine's heartbeat is started on creation when its policy requires a heartbeat. Overwise, it is started on first ping.



Please note: this only applies to machines, not processes. Processes always have a heartbeat basis of `FROM_CREATION`, because their heartbeat is required.



###### Options



- `FROM_CREATION`: Machine heartbeat is started immediately upon creation.
- `FROM_FIRST_PING`: Mahine heartbeat is started after their first heartbeat ping event.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-machineUniquenessStrategy) data.attributes.machineUniquenessStrategy

stringdefault=UNIQUE\_PER\_LICENSE



The uniqueness validation strategy for machine fingerprints. You can utilize this to prevent duplicate fingerprints across a variety of scopes.



This can be especially useful for disallowing trial licenses for a specific machine (i.e. device) that had previously completed a trial evaluation using another trial license. You would set the trial policy to `UNIQUE_PER_POLICY`, and then set any non-trial policies to `UNIQUE_PER_LICENSE`. This would effectively block a machine from using multiple trial licenses, while still allowing the machine to be associated with non-trial licenses.



###### Options



- `UNIQUE_PER_ACCOUNT`: Machine fingerprints must be unique across the entire Keygen account. This will block all duplicate fingerprints, regardless of whether or not the fingerprint belongs to another product, policy or license.
- `UNIQUE_PER_PRODUCT`: Machine fingerprints must be unique across all licenses belonging to a product. This will block all duplicate fingerprints of the same product, regardless of whether or not the fingerprint belongs to another policy or license.
- `UNIQUE_PER_POLICY`: Machine fingerprints must be unique across all licenses for the policy. This will block all duplicate fingerprints of the same policy, regardless of whether or not the fingerprint belongs to another license.
- `UNIQUE_PER_LICENSE`: Machine fingerprints must be unique to the license. This will block all duplicate fingerprints for same license, but the same fingerprint can exist across different licenses. This is the default.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-machineMatchingStrategy) data.attributes.machineMatchingStrategy

stringdefault=MATCH\_ANY



The matching strategy for machine fingerprints supplied during a license validation.



###### Options



- `MATCH_ANY`: At least 1 of the supplied fingerprints must match a fingerprint for the license's associated machines. E.g. if 3 fingerprints are supplied, at least 1 of them must match.
- `MATCH_TWO`: At least 2 of the supplied fingerprints must match a fingerprint for the license's associated machines. E.g. if 4 fingerprints are supplied, at least 2 of them must match.
- `MATCH_MOST`: The majority of supplied fingerprints must match the fingerprints for the license's associated machines. E.g. if 3 fingerprints are supplied, at least 2 of them must match.
- `MATCH_ALL`: All supplied fingerprints must match the fingerprints for the license's associated machines. E.g. if 3 fingerprints are supplied, all 3 of them must match.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-componentUniquenessStrategy) data.attributes.componentUniquenessStrategy

stringdefault=UNIQUE\_PER\_MACHINE



The uniqueness validation strategy for component fingerprints. You can utilize this to prevent duplicate fingerprints across a variety of scopes.



This is especially useful for disallowing trial licenses for specific hardware that had previously completed a trial evaluation using another trial machine or license. You would set the trial policy to `UNIQUE_PER_POLICY`, and then set any non-trial policies to `UNIQUE_PER_LICENSE`. This would effectively block a device from using multiple trials even if e.g. the operating system was reinstalled.



###### Options



- `UNIQUE_PER_ACCOUNT`: Component fingerprints must be unique across the entire Keygen account. This will block all duplicate fingerprints, regardless of whether or not the fingerprint belongs to another product, policy or license.
- `UNIQUE_PER_PRODUCT`: Component fingerprints must be unique across all licenses belonging to a product. This will block all duplicate fingerprints of the same product, regardless of whether or not the fingerprint belongs to another policy or license.
- `UNIQUE_PER_POLICY`: Component fingerprints must be unique across all licenses for the policy. This will block all duplicate fingerprints of the same policy, regardless of whether or not the fingerprint belongs to another license.
- `UNIQUE_PER_LICENSE`: Component fingerprints must also be unique to the license. This will block all duplicate fingerprints for same license, but the same fingerprint can exist across different licenses.
- `UNIQUE_PER_MACHINE`: Component fingerprints must be unique to the machine. This will allow the same component to exist across multiple machines for the same license. This is the default.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-componentMatchingStrategy) data.attributes.componentMatchingStrategy

stringdefault=MATCH\_ANY



The matching strategy for component fingerprints supplied during a license validation.



This is especially useful for managing individual hardware components of a given device, e.g. HDD ID, mobo ID, MAC addresses, IP addresses, etc., and then requiring that some, most, or all components match during a license validation. These can be managed through the [components resource](https://keygen.sh/docs/api/components/).



###### Options



- `MATCH_ANY`: At least 1 of the supplied fingerprints must match a fingerprint for the machine's associated components. E.g. if 3 fingerprints are supplied, at least 1 of them must match.
- `MATCH_TWO`: At least 2 of the supplied fingerprints must match a fingerprint for the machine's associated components. E.g. if 4 fingerprints are supplied, at least 2 of them must match.
- `MATCH_MOST`: The majority of supplied fingerprints must match the fingerprints for the machine's associated components. E.g. if 3 fingerprints are supplied, at least 2 of them must match.
- `MATCH_ALL`: All supplied fingerprints must match the fingerprints for the machine's associated components. E.g. if 3 fingerprints are supplied, all 3 of them must match.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-expirationStrategy) data.attributes.expirationStrategy

stringdefault=RESTRICT\_ACCESS



The strategy for expired licenses during a license validation and when accessing releases.



This is useful in scenarios where you want to allow normal product usage for expired licenses and access to older releases published prior their expiry, but restrict access to newer releases published after the expiry (commonly called a perpetual-fallback license), or when a license has a maintenance window after which upgrades are paused until renewal. Expiration strategies may also change license validation and authentication behavior ( [read more](https://keygen.sh/docs/api/authentication/#expirations-and-suspensions)).



###### Options



- `RESTRICT_ACCESS`: Expired licenses can continue to access releases published prior to their license expiry. Automatic upgrades are enabled, but only for releases published prior to their expiry. Validation scopes take precedence over expiry check during license validation. This is the default.
- `REVOKE_ACCESS`: Expired licenses are no longer able to access any releases, including past releases. Automatic upgrades are disabled. Expiry check takes precedence over scopes during license validation.
- `MAINTAIN_ACCESS`: Expired licenses can continue to access releases published prior to their license expiry. Automatic upgrades are enabled, but only for releases published prior to their expiry. Validation scopes take precedence over expiry check during license validation. In addition, validations with an `EXPIRED` code will return `valid=true`. This is commonly used for perpetual-fallback licenses.
- `ALLOW_ACCESS`: Expired licenses can access any releases, including past releases and future releases. Automatic upgrades are enabled. Validation scopes take precedence over expiry check during license validation. In addition, validations with an `EXPIRED` code will return `valid=true`.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-expirationBasis) data.attributes.expirationBasis

stringdefault=FROM\_CREATION



Control when a license's initial expiry is set. For example, you may want to initialize a license's expiry after its first activation, rather than at time of creation. By default, a license's expiration date is set on creation. Any interim expiry value will be `null`.



**When using an expiration basis other than `FROM_CREATION`, the license's expiration is set asychronously, after the event has been processed in our systems.** For example, when using a `FROM_FIRST_VALIDATION` expiration basis, the license's expiry will **not** immediately be set _during_ its first validation request and then subsequently included in the validation response. Rather, it will be set _after_ the request and response lifecycle, once the event has fully propagated through our systems. This could take up to a few minutes.



This is especially useful in scenarios where you're generating licenses upfront in bulk for later distribution, e.g. as part of a digital component to a physical product. Instead of distributing licenses that have expirations already set, and potentially expired given enough time, you can instead set the expiry on some event in the future, e.g. validation or activation.



###### Options



- `FROM_CREATION`: License expirations are set immediately upon creation.
- `FROM_FIRST_VALIDATION`: License expirations are set after their first license validation event.
- `FROM_FIRST_ACTIVATION`: License expirations are set after their first machine activation event.
- `FROM_FIRST_DOWNLOAD`: License expirations are set after their first release download event.
- `FROM_FIRST_USE`: License expirations are set after their first usage increment event.

Note: "usage" is **not** activation or validation.`FROM_FIRST_USE` is for [a license's usage](https://keygen.sh/docs/api/licenses/#licenses-actions-increment-usage).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-renewalBasis) data.attributes.renewalBasis

stringdefault=FROM\_EXPIRY



Control how a license's expiry is extended during renewal. For example, you may want to extend the license's expiry from the current time, instead of from the license's current expiry value.



###### Options



- `FROM_EXPIRY`: License expiry is extended from the license's current expiry value, i.e. `license.expiry = license.expiry + policy.duration`. This is the default.
- `FROM_NOW`: License expiry is extended from the current time, i.e. `license.expiry = time.now + policy.duration`.
- `FROM_NOW_IF_EXPIRED`: Conditionally extend license expiry from the current time if the license is expired, otherwise extend from the license's current expiry value.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-transferStrategy) data.attributes.transferStrategy

stringdefault=KEEP\_EXPIRY



Control whether a license's expiration is reset when transferred to this policy.



This is especially useful when transferring a license from a policy with a short duration to one with a longer duration. For example, upgrading from a 14 day free trial license to a yearly license.



###### Options



- `RESET_EXPIRY`: Reset the transferred license's expiry from the time of transfer. For example, if the license had an expiry 3 months from now, and the new policy has a duration of 1 year, transferring would reset the expiry to 1 year from the time of transfer. When the policy has no duration, the license's expiry is removed.
- `KEEP_EXPIRY`: Do not change the license's current expiry. This is the default.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-authenticationStrategy) data.attributes.authenticationStrategy

stringdefault=TOKEN



The strategy used for authenticating as a license, for client-side integrations.



This defines the ways a license is allowed to authenticate with the API. To disable license authentication, e.g. in an entirely server-side integration, set this to `NONE`.



###### Options



- `TOKEN`: Allow licenses to authenticate using [a license token](https://keygen.sh/docs/api/authentication/#license-tokens). This is the default.
- `LICENSE`: Allow licenses to authenticate using [a license key](https://keygen.sh/docs/api/authentication/#license-authentication).
- `MIXED`: Allow both license token and license key authentication (each covered above).
- `NONE`: Disable the ability for licenses to authenticate with the API.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-machineLeasingStrategy) data.attributes.machineLeasingStrategy

stringdefault=PER\_LICENSE



The strategy used for leasing machines.



**Please note that a nil owner is significant for a `PER_USER` leasing strategy.** When a machine's owner is nil (or null), the sum of all machines with a nil owner will be counted towards the license's machine limit. Please make sure that you're assigning an owner to machines if you utilize this leasing strategy.



This defines how machines are leased and counted, especially i.r.t. the policy's max machines limit.



###### Options



- `PER_LICENSE`: Machines are counted per-license. For example, with a max machines value of 2, each license could have 2 machines. This is the default.
- `PER_USER`: Machines are counted per-user, per-license. For example, with a max machines value of 2, each user could have 2 machines per-license.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-processLeasingStrategy) data.attributes.processLeasingStrategy

stringdefault=PER\_MACHINE



The strategy used for leasing machine processes.



**Please note that a nil owner is significant for a `PER_USER` leasing strategy.** When a machine's owner is nil (or null), the sum of all processes belonging to a machine with a nil owner will be counted towards the license's process limit. Please make sure that you're assigning an owner to machines if you utilize this leasing strategy.



This defines how processes are leased and counted, especially i.r.t. the policy's max processes limit.



###### Options



- `PER_MACHINE`: Processes are counted per-machine. For example, given a policy with a max processes value of 5, each license could have up to 5 processes for each machine. This is the default.
- `PER_LICENSE`: Processes are counted per-license. For example, with a max processes value of 5, each license could have up to 5 processes combined across all machines.
- `PER_USER`: Processes are counted per-user, per-license. For example, with a max processes value of 5, each user could have up to 5 processes combined across all owned machines per-license.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-overageStrategy) data.attributes.overageStrategy

stringdefault=NO\_OVERAGE



The strategy used for allowing machine, core, memory, disk, and process overages. Set to `NO_OVERAGE` to disable overages altogether (attempts to exceed a limit will then result in an error).



This defines an overage allowance for a license. This allowance effects a license's machine limit, machine core, memory, and disk limits, and its machine process limit. Giving a license an overage allowance may be beneficial in environments where rolling restarts of the application are common, or another situation where overages are expected. This lets you allow overages, bounded and unbounded, while handling the unique validation codes to ensure total license compliance.



###### Options



- `ALWAYS_ALLOW_OVERAGE`: The license may exceed its limits, and doing so will not effect the licenses validity, i.e. the following validation codes will return `valid=true`: `TOO_MANY_MACHINES`, `TOO_MANY_CORES`, `TOO_MUCH_MEMORY`, `TOO_MUCH_DISK`, `TOO_MANY_PROCESSES`.
- `ALLOW_1_25X_OVERAGE`: The license may exceed its limits, up to a maximum of 1.25x. Exceeding a limit will not effect the license's validity right away, i.e. the following validation codes will return `valid=true`: `TOO_MANY_MACHINES`, `TOO_MANY_CORES`, `TOO_MUCH_MEMORY`, `TOO_MUCH_DISK`, `TOO_MANY_PROCESSES`. The license will begin to fail validation once the 1.25x allowance has been exceeded. When using a 1.25x allowance, all resource limits must be divisible by 4.
- `ALLOW_1_5X_OVERAGE`: The license may exceed its limits, up to a maximum of 1.5x. Exceeding a limit will not effect the license's validity right away, i.e. the following validation codes will return `valid=true`: `TOO_MANY_MACHINES`, `TOO_MANY_CORES`, `TOO_MUCH_MEMORY`, `TOO_MUCH_DISK`, `TOO_MANY_PROCESSES`. The license will begin to fail validation once the 1.5x allowance has been exceeded. When using a 1.5x allowance, all resource limits must be divisible by 2.
- `ALLOW_2X_OVERAGE`: The license may exceed its limits, up to a maximum of 2x. Exceeding a limit will not effect the license's validity right away, i.e. the following validation codes will return `valid=true`: `TOO_MANY_MACHINES`, `TOO_MANY_CORES`, `TOO_MUCH_MEMORY`, `TOO_MUCH_DISK`, `TOO_MANY_PROCESSES`. The license will begin to fail validation once the 2x allowance has been exceeded.
- `NO_OVERAGE`: Do not allow overages. Attempts to exceed limits will fail. This is the default.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-metadata) data.attributes.metadata

object<string, any>



Object containing policy [metadata](https://keygen.sh/docs/api/metadata/).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-created) data.attributes.created

timestamp (iso8601)read only



When the policy was created.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-attrs-updated) data.attributes.updated

timestamp (iso8601)read only



When the policy was last updated.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-relationships-account) data.relationships.account

individual



The account that the policy belongs to.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-relationships-environment) data.relationships.environment

individual



The environment that the policy belongs to.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-relationships-product) data.relationships.product

individual



The product that the policy is associated with.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-relationships-pool) data.relationships.pool

collection



The pool of pre-determined keys for the policy.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-object-relationships-licenses) data.relationships.licenses

collection



The licenses that implement the policy.


#### Example object

```
{
  "data": {
    "id": "0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
    "type": "policies",
    "links": {
      "self": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"
    },
    "attributes": {
      "name": "Premium Add-On",
      "duration": 1209600,
      "strict": false,
      "floating": true,
      "scheme": null,
      "requireProductScope": false,
      "requirePolicyScope": false,
      "requireMachineScope": false,
      "requireFingerprintScope": false,
      "requireComponentsScope": false,
      "requireUserScope": false,
      "requireChecksumScope": false,
      "requireVersionScope": false,
      "requireCheckIn": false,
      "checkInInterval": null,
      "checkInIntervalCount": null,
      "usePool": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": null,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "encrypted": false,
      "protected": false,
      "requireHeartbeat": false,
      "heartbeatDuration": null,
      "heartbeatCullStrategy": "DEACTIVATE_DEAD",
      "heartbeatResurrectionStrategy": "NO_REVIVE",
      "heartbeatBasis": "FROM_FIRST_PING",
      "machineUniquenessStrategy": "UNIQUE_PER_LICENSE",
      "machineMatchingStrategy": "MATCH_ALL",
      "componentUniquenessStrategy": "UNIQUE_PER_MACHINE",
      "componentMatchingStrategy": "MATCH_ALL",
      "expirationStrategy": "RESTRICT_ACCESS",
      "expirationBasis": "FROM_CREATION",
      "renewalBasis": "FROM_EXPIRY",
      "transferStrategy": "KEEP_EXPIRY",
      "authenticationStrategy": "TOKEN",
      "machineLeasingStrategy": "PER_LICENSE",
      "processLeasingStrategy": "PER_MACHINE",
      "overageStrategy": "NO_OVERAGE",
      "metadata": {},
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}"
        },
        "data": {
          "type": "accounts",
          "id": "{ACCOUNT}"
        }
      },
      "product": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/product"
        },
        "data": {
          "type": "products",
          "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"
        }
      },
      "pool": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/pool"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/licenses"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
    "type": "policies",
    "links": {
      "self": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"
    },
    "attributes": {
      "name": "Premium Add-On",
      "duration": 1209600,
      "strict": false,
      "floating": true,
      "scheme": null,
      "requireProductScope": false,
      "requirePolicyScope": false,
      "requireMachineScope": false,
      "requireFingerprintScope": false,
      "requireComponentsScope": false,
      "requireUserScope": false,
      "requireChecksumScope": false,
      "requireVersionScope": false,
      "requireCheckIn": false,
      "checkInInterval": null,
      "checkInIntervalCount": null,
      "usePool": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": null,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "encrypted": false,
      "protected": false,
      "requireHeartbeat": false,
      "heartbeatDuration": null,
      "heartbeatCullStrategy": "DEACTIVATE_DEAD",
      "heartbeatResurrectionStrategy": "NO_REVIVE",
      "heartbeatBasis": "FROM_FIRST_PING",
      "machineUniquenessStrategy": "UNIQUE_PER_LICENSE",
      "machineMatchingStrategy": "MATCH_ALL",
      "componentUniquenessStrategy": "UNIQUE_PER_MACHINE",
      "componentMatchingStrategy": "MATCH_ALL",
      "expirationStrategy": "RESTRICT_ACCESS",
      "expirationBasis": "FROM_CREATION",
      "renewalBasis": "FROM_EXPIRY",
      "transferStrategy": "KEEP_EXPIRY",
      "authenticationStrategy": "TOKEN",
      "machineLeasingStrategy": "PER_LICENSE",
      "processLeasingStrategy": "PER_MACHINE",
      "overageStrategy": "NO_OVERAGE",
      "metadata": {},
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}"
        },
        "data": {
          "type": "accounts",
          "id": "{ACCOUNT}"
        }
      },
      "product": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/product"
        },
        "data": {
          "type": "products",
          "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"
        }
      },
      "pool": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/pool"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/licenses"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/policies/\#policies-create) Create a policy

Creates a new policy resource.

### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-permissions) Required permissions

- policy.create

### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-name) data.attributes.name

stringrequired



The name of the policy.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-duration) data.attributes.duration

integeroptional



The duration for the policy in seconds. When a new license implements the policy, the license's expiry is calculated with this value (i.e. `time.now + policy.duration`). If `null`, licenses will never expire.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-scheme) data.attributes.scheme

stringoptional



The cryptographic encryption/signature scheme used on license keys. Can be used to implement offline licensing by storing tamper-proof data within a license's key. When `null` or omitted, the license's key will be stored unchanged.



Even though we're signing or encrypting license keys, that doesn't mean the value you specify is hidden. Keep in mind that the contents of the keys are usually base64url encoded (using [RFC 4648](https://tools.ietf.org/html/rfc4648), a URL-safe version of base64 which is supported in most programming languages), meaning they are publicly readable if decoded. For more info, see the [signature section](https://keygen.sh/docs/api/signatures/). **Do not store sensitive information within keys, as the contents can be read by decoding the key.**



###### Options



- `ED25519_SIGN`: Sign license keys with your account's Ed25519 signing key, using elliptic curve cryptography and SHA512. The given license key data will be base64url encoded and then prefixed with `key/` before signing, and the signing data's signature will be base64url encoded and then appended onto the end of the signing data, delimited by the `.` character, e.g. `key/{URLBASE64URL_KEY}.{URLBASE64URL_SIGNATURE}`. This is our recommended signing scheme, but it may not be supported in your preferred programming language. Signatures are deterministic.
- `RSA_2048_PKCS1_PSS_SIGN_V2`: Sign license keys with your account's 2048-bit RSA private key using RSA PKCS1-PSS padding, with a SHA256 digest, max salt length, and a SHA256 MGF1. The provided embedded dataset will be base64url encoded and then prefixed with `key/` before signing, and the signing data's signature will be base64url encoded and then appended onto the end of the signing data, delimited by the `.` character, e.g. `key/{URLBASE64URL_KEY}.{URLBASE64URL_SIGNATURE}`, resulting in the final key. This is our recommended RSA scheme, but it may not be supported in your preferred programming language. Signatures are non-deterministic.
- `RSA_2048_PKCS1_SIGN_V2`: Sign license keys with your account's 2048-bit RSA private key using RSA PKCS1 v1.5 padding, with a SHA256 digest. The provided embedded dataset will be base64url encoded and then prefixed with `key/` before signing, and the signing data's signature will be base64url encoded and then appended onto the end of the signing data, delimited by the `.` character, e.g. `key/{URLBASE64URL_KEY}.{URLBASE64URL_SIGNATURE}`, resulting in the final key. Signatures are deterministic.
- `RSA_2048_PKCS1_ENCRYPT`: Encrypt license keys with your account's 2048-bit RSA private key using RSA PKCS1 v1.5 padding. The provided dataset will be encrypted using your account's private key and then base64url encoded, resulting in the final key. The key can be decrypted using your account's public key. The key must contain no more than `245` bytes (please note this is _byte length_ not _string length_).
- `RSA_2048_JWT_RS256`: Encode a license claims payload into a JWT using the RS256 algorithm. The license key must be a valid JWT claims payload (i.e. a JSON encoded string). The JWT will be signed using your account's 2048-bit RSA private key and can be verified using your account's public key. The resulting key will be a full JSON Web Token. We do not modify your claims payload.
- `RSA_2048_PKCS1_PSS_SIGN`: **Deprecated: use v2.** Sign license keys with your account's 2048-bit RSA private key using RSA PKCS1-PSS padding, with a SHA256 digest, max salt length, and a SHA256 MGF1. The provided embedded dataset will be base64url encoded, and its signature will be base64url encoded and then appended onto the end of the encoded key, delimited by the `.` character, e.g. `{URLBASE64URL_KEY}.{URLBASE64URL_SIGNATURE}`, resulting in the final key.
- `RSA_2048_PKCS1_SIGN`: **Deprecated: use v2.** Sign license keys with your account's 2048-bit RSA private key using RSA PKCS1 v1.5 padding, with a SHA256 digest. The provided embedded dataset will be base64url encoded, and its signature will be base64url encoded and then appended onto the end of the encoded key, delimited by the `.` character, e.g. `{URLBASE64URL_KEY}.{URLBASE64URL_SIGNATURE}`, resulting in the final key.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-strict) data.attributes.strict

booleanoptional



When enabled, a license that implements the policy may be considered invalid if its machine limit, machine core, memory, or disk limits, or machine processes limit is surpassed, according to the policy's overage strategy. In addition, strict requires a license to have at least 1 machine associated with it in order to pass validation.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-floating) data.attributes.floating

booleanoptional



When enabled, a license that implements the policy will be valid across multiple machines. Though this is not enforced i.e. it does not invalidate a license if it's associated with more than 1 machine unless the policy is strict.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-requireProductScope) data.attributes.requireProductScope

booleanoptional



When enabled, validating a license that implements the policy will require a product scope that matches the licenses's product relationship by its identifier (UUID).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-requirePolicyScope) data.attributes.requirePolicyScope

booleanoptional



When enabled, validating a license that implements the policy will require a policy scope that matches the licenses's policy relationship by its identifier (UUID).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-requireMachineScope) data.attributes.requireMachineScope

booleanoptional



When enabled, validating a license that implements the policy will require a machine scope that matches at least 1 of the licenses's machine relationships by its identifier (UUID).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-requireFingerprintScope) data.attributes.requireFingerprintScope

booleanoptional



When enabled, validating a license that implements the policy will require a fingerprint scope that matches at least 1 of the licenses's machine relationships by its fingerprint.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-requireComponentsScope) data.attributes.requireComponentsScope

booleanoptional



When enabled, validating a license that implements the policy will require a components scope that matches at least 1 of the licenses's machine components by its fingerprint.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-requireUserScope) data.attributes.requireUserScope

booleanoptional



When enabled, validating a license that implements the policy will require a user scope that matches the license's user relationship.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-requireChecksumScope) data.attributes.requireChecksumScope

booleanoptional



When enabled, validating a license that implements the policy will require a checksum scope to be provided, matching an accessible artifact for the license.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-requireVersionScope) data.attributes.requireVersionScope

booleanoptional



When enabled, validating a license that implements the policy will require a version scope to be provided, matching an accessible release for the license.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-requireCheckIn) data.attributes.requireCheckIn

booleanoptional



When enabled, a license that implements the policy will require check-in at a predefined interval to continue to pass validation i.e. if a license misses a check-in, it will be invalidated.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-checkInInterval) data.attributes.checkInInterval

stringoptional



One of `day`, `week`, `month` or `year`. The frequency at which a license should check-in.



###### Options



- `day`: Require a license implementing the policy to check-in at least once every day to remain valid.
- `week`: Require a license implementing the policy to check-in at least once every week to remain valid.
- `month`: Require a license implementing the policy to check-in at least once every month to remain valid.
- `year`: Require a license implementing the policy to check-in at least once every year to remain valid.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-checkInIntervalCount) data.attributes.checkInIntervalCount

integeroptional



The number of intervals (specified in the check-in interval property) between each required check-in. For example, `checkInInterval=week` and `checkInIntervalCount=2` requires check-in every 2 weeks. Must be a number between 1 and 365 inclusive.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-usePool) data.attributes.usePool

booleanoptional



Whether or not to pull license keys from a finite pool of pre-determined keys. This is useful for invite-only programs such as a private beta, when you need a limited set of licenses, or when you want to define the keys manually. This cannot be changed later on.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-maxMachines) data.attributes.maxMachines

integeroptional



The maximum number of machines a license implementing the policy can have associated with it. This is only enforced when the policy is strict. When `null`, an unlimited number of machines may be associated with a license if the policy is floating. Must be a number greater than 0, and must be equal to 1 for non-floating policies.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-maxProcesses) data.attributes.maxProcesses

integeroptional



The maximum number of machine processes a license implementing the policy can have associated with it, also depending on the policy's leasing strategy. When `null`, an unlimited number of machine processes may be associated with a license. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-maxUsers) data.attributes.maxUsers

integeroptional



The maximum number of users a license implementing the policy can have associated with it. When `null`, an unlimited number of users may be associated with a license. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-maxCores) data.attributes.maxCores

integeroptional



The maximum number of machine CPU cores a license implementing the policy can have associated with it. The count is the sum of all cores for a license's machines. When `null`, a license which implements the policy can have an unlimited number of CPU cores.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-maxMemory) data.attributes.maxMemory

integeroptional



The maximum amount of machine memory, in bytes, a license implementing the policy can have associated with it. The count is the sum of all memory across a license's machines. When `null`, a license which implements the policy can consume unlimited memory.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-maxDisk) data.attributes.maxDisk

integeroptional



The maximum amount of machine disk, in bytes, a license implementing the policy can have associated with it. The count is the sum of all disk across a license's machines. When `null`, a license which implements the policy can consume unlimited disk.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-maxUses) data.attributes.maxUses

integeroptional



The maximum number of uses a license implementing the policy can have. Cannot exceed `2,147,483,647`, which is the maximum value of a 4 byte integer. When `null`, a license which implements the policy can have an unlimited number of uses. This attribute is not taken into account during license validation. See the license's usage-related actions for more details.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-protected) data.attributes.protected

booleanoptional



Whether or not the policy is protected. A protected policy disallows users the ability to create and manage licenses themselves, useful in situations where Keygen is only managed server-side or when you aren't listening for the appropriate user-initiated webhook events. If the account is protected, all policies automatically inherit that value when left blank.



Unprotected policies are particularly useful for trial policies alongside user profiles, since they allow a user to create a license implementing the unprotected trial policy, but the user cannot create or transfer a license to a protected paid policy. Upgrades then, from trial to paid, would need to be handled server-side, e.g. after an event from your payment provider.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-requireHeartbeat) data.attributes.requireHeartbeat

booleanoptional



Whether or not the policy requires its machines to maintain a heartbeat. When enabled, machines that do not have a heartbeat will fail validation with a `HEARTBEAT_NOT_STARTED` validation code. In addition, when enabled, new machines will automatically have their first heartbeat set upon creation. When disabled, heartbeats are optional.



Please note: this only applies to machines, not processes. Processes always require a heartbeat.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-heartbeatDuration) data.attributes.heartbeatDuration

integeroptional



The heartbeat duration for the policy, in seconds. When a machine has an active heartbeat monitor, the machine must send heartbeat pings within this timeframe to remain activated. Must be greater than or equal to 1 minute (60).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-heartbeatCullStrategy) data.attributes.heartbeatCullStrategy

stringoptional



The strategy used for culling dead machines and processes.



Please note: dead machines will not pass license validation. The resulting failed validation code will be `HEARTBEAT_DEAD`.



###### Options



- `DEACTIVATE_DEAD`: Automatically deactivate machines that fail to maintain their heartbeat pings. This is the default.
- `KEEP_DEAD`: Mark machines that fail to maintain their heartbeat pings as dead, but do not deactivate.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-heartbeatResurrectionStrategy) data.attributes.heartbeatResurrectionStrategy

stringoptional



The strategy used for controlling whether or not dead machines and processes can be resurrected shortly after death. A resurrection occurs when a heartbeat ping is sent to a dead machine or process that is within its resurrection window.



Please note: dead machines will not pass license validation. The resulting failed validation code will be `HEARTBEAT_DEAD`.



###### Options



- `NO_REVIVE`: Do not allow dead machines and processes to be revived. This is the default.
- `1_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 1 minute from its time of death.
- `2_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 2 minutes from its time of death.
- `5_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 5 minutes from its time of death.
- `10_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 10 minutes from its time of death.
- `15_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 15 minutes from its time of death.
- `ALWAYS_REVIVE`: A machine or process can always be revived. Requires a cull strategy of `KEEP_DEAD`.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-heartbeatBasis) data.attributes.heartbeatBasis

stringoptional



Control when a machine's initial heartbeat is started. By default, a machine's heartbeat is started on creation when its policy requires a heartbeat. Overwise, it is started on first ping.



Please note: this only applies to machines, not processes. Processes always have a heartbeat basis of `FROM_CREATION`, because their heartbeat is required.



###### Options



- `FROM_CREATION`: Machine heartbeat is started immediately upon creation.
- `FROM_FIRST_PING`: Mahine heartbeat is started after their first heartbeat ping event.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-machineUniquenessStrategy) data.attributes.machineUniquenessStrategy

stringoptional



The uniqueness validation strategy for machine fingerprints. You can utilize this to prevent duplicate fingerprints across a variety of scopes.



This can be especially useful for disallowing trial licenses for a specific machine (i.e. device) that had previously completed a trial evaluation using another trial license. You would set the trial policy to `UNIQUE_PER_POLICY`, and then set any non-trial policies to `UNIQUE_PER_LICENSE`. This would effectively block a machine from using multiple trial licenses, while still allowing the machine to be associated with non-trial licenses.



###### Options



- `UNIQUE_PER_ACCOUNT`: Machine fingerprints must be unique across the entire Keygen account. This will block all duplicate fingerprints, regardless of whether or not the fingerprint belongs to another product, policy or license.
- `UNIQUE_PER_PRODUCT`: Machine fingerprints must be unique across all licenses belonging to a product. This will block all duplicate fingerprints of the same product, regardless of whether or not the fingerprint belongs to another policy or license.
- `UNIQUE_PER_POLICY`: Machine fingerprints must be unique across all licenses for the policy. This will block all duplicate fingerprints of the same policy, regardless of whether or not the fingerprint belongs to another license.
- `UNIQUE_PER_LICENSE`: Machine fingerprints must be unique to the license. This will block all duplicate fingerprints for same license, but the same fingerprint can exist across different licenses. This is the default.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-machineMatchingStrategy) data.attributes.machineMatchingStrategy

stringoptional



The matching strategy for machine fingerprints supplied during a license validation.



###### Options



- `MATCH_ANY`: At least 1 of the supplied fingerprints must match a fingerprint for the license's associated machines. E.g. if 3 fingerprints are supplied, at least 1 of them must match.
- `MATCH_TWO`: At least 2 of the supplied fingerprints must match a fingerprint for the license's associated machines. E.g. if 4 fingerprints are supplied, at least 2 of them must match.
- `MATCH_MOST`: The majority of supplied fingerprints must match the fingerprints for the license's associated machines. E.g. if 3 fingerprints are supplied, at least 2 of them must match.
- `MATCH_ALL`: All supplied fingerprints must match the fingerprints for the license's associated machines. E.g. if 3 fingerprints are supplied, all 3 of them must match.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-componentUniquenessStrategy) data.attributes.componentUniquenessStrategy

stringoptional



The uniqueness validation strategy for machine and component fingerprints. You can utilize this to prevent duplicate fingerprints across a variety of scopes. Uniqueness is per-type, i.e. machine and component fingerprints will never conflict. As a baseline, machine fingerprints will always be unique per-license, and component fingerprints will always be unique per-machine.



This is especially useful for disallowing trial licenses for specific hardware that had previously completed a trial evaluation using another trial machine or license. You would set the trial policy to `UNIQUE_PER_POLICY`, and then set any non-trial policies to `UNIQUE_PER_LICENSE`. This would effectively block a device from using multiple trials even if e.g. the operating system was reinstalled.



###### Options



- `UNIQUE_PER_ACCOUNT`: Component fingerprints must be unique across the entire Keygen account. This will block all duplicate fingerprints, regardless of whether or not the fingerprint belongs to another product, policy or license.
- `UNIQUE_PER_PRODUCT`: Component fingerprints must be unique across all licenses belonging to a product. This will block all duplicate fingerprints of the same product, regardless of whether or not the fingerprint belongs to another policy or license.
- `UNIQUE_PER_POLICY`: Component fingerprints must be unique across all licenses for the policy. This will block all duplicate fingerprints of the same policy, regardless of whether or not the fingerprint belongs to another license.
- `UNIQUE_PER_LICENSE`: Component fingerprints must also be unique to the license. This will block all duplicate fingerprints for same license, but the same fingerprint can exist across different licenses.
- `UNIQUE_PER_MACHINE`: Component fingerprints must be unique to the machine. This will allow the same component to exist across multiple machines for the same license. This is the default.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-componentMatchingStrategy) data.attributes.componentMatchingStrategy

stringoptional



The matching strategy for component fingerprints supplied during a license validation.



This is especially useful for managing individual hardware components of a given device, e.g. HDD ID, mobo ID, MAC addresses, IP addresses, etc., and then requiring that some, most, or all components match during a license validation. These can be managed through the [components resource](https://keygen.sh/docs/api/components/).



###### Options



- `MATCH_ANY`: At least 1 of the supplied fingerprints must match a fingerprint for the machine's associated components. E.g. if 3 fingerprints are supplied, at least 1 of them must match.
- `MATCH_TWO`: At least 2 of the supplied fingerprints must match a fingerprint for the machine's associated components. E.g. if 4 fingerprints are supplied, at least 2 of them must match.
- `MATCH_MOST`: The majority of supplied fingerprints must match the fingerprints for the machine's associated components. E.g. if 3 fingerprints are supplied, at least 2 of them must match.
- `MATCH_ALL`: All supplied fingerprints must match the fingerprints for the machine's associated components. E.g. if 3 fingerprints are supplied, all 3 of them must match.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-expirationStrategy) data.attributes.expirationStrategy

stringoptional



The strategy for expired licenses during a license validation and when accessing releases.



This is useful in scenarios where you want to allow normal product usage for expired licenses and access to older releases published prior their expiry, but restrict access to newer releases published after the expiry (commonly called a perpetual-fallback license), or when a license has a maintenance window after which upgrades are paused until renewal. Expiration strategies may also change license validation and authentication behavior ( [read more](https://keygen.sh/docs/api/authentication/#expirations-and-suspensions)).



###### Options



- `RESTRICT_ACCESS`: Expired licenses can continue to access releases published prior to their license expiry. Automatic upgrades are enabled, but only for releases published prior to their expiry. Validation scopes take precedence over expiry check during license validation. This is the default.
- `REVOKE_ACCESS`: Expired licenses are no longer able to access any releases, including past releases. Automatic upgrades are disabled. Expiry check takes precedence over scopes during license validation.
- `MAINTAIN_ACCESS`: Expired licenses can continue to access releases published prior to their license expiry. Automatic upgrades are enabled, but only for releases published prior to their expiry. Validation scopes take precedence over expiry check during license validation. In addition, validations with an `EXPIRED` code will return `valid=true`. This is commonly used for perpetual-fallback licenses.
- `ALLOW_ACCESS`: Expired licenses can access any releases, including past releases and future releases. Automatic upgrades are enabled. Validation scopes take precedence over expiry check during license validation. In addition, validations with an `EXPIRED` code will return `valid=true`.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-expirationBasis) data.attributes.expirationBasis

stringoptional



Control when a license's initial expiry is set. By default, a license's expiration date is set on creation.



###### Options



- `FROM_CREATION`: License expirations are set immediately upon creation.
- `FROM_FIRST_VALIDATION`: License expirations are set after their first license validation event.
- `FROM_FIRST_ACTIVATION`: License expirations are set after their first machine activation event.
- `FROM_FIRST_DOWNLOAD`: License expirations are set after their first release download event.
- `FROM_FIRST_USE`: License expirations are set after their first usage increment event.

Note: "usage" is **not** activation or validation.`FROM_FIRST_USE` is for [a license's usage](https://keygen.sh/docs/api/licenses/#licenses-actions-increment-usage).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-renewalBasis) data.attributes.renewalBasis

stringoptional



Control how a license's expiry is extended during renewal. For example, you may want to extend the license's expiry from the current time, instead of from the license's current expiry value.



###### Options



- `FROM_EXPIRY`: License expiry is extended from the license's current expiry value, i.e. `license.expiry = license.expiry + policy.duration`. This is the default.
- `FROM_NOW`: License expiry is extended from the current time, i.e. `license.expiry = time.now + policy.duration`.
- `FROM_NOW_IF_EXPIRED`: Conditionally extend license expiry from the current time if the license is expired, otherwise extend from the license's current expiry value.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-transferStrategy) data.attributes.transferStrategy

stringoptional



Control whether a license's expiration is reset when transferred to this policy.



This is especially useful when transferring a license from a policy with a short duration to one with a longer duration. For example, upgrading from a 14 day free trial license to a yearly license.



###### Options



- `RESET_EXPIRY`: Reset the transferred license's expiry from the time of transfer. For example, if the license had an expiry 3 months from now, and the new policy has a duration of 1 year, transferring would reset the expiry to 1 year from the time of transfer. When the policy has no duration, the license's expiry is removed.
- `KEEP_EXPIRY`: Do not change the license's current expiry. This is the default.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-authenticationStrategy) data.attributes.authenticationStrategy

stringoptional



The strategy used for authenticating as a license, for client-side integrations.



###### Options



- `TOKEN`: Allow licenses to authenticate using [a license token](https://keygen.sh/docs/api/authentication/#license-tokens). This is the default.
- `LICENSE`: Allow licenses to authenticate using [a license key](https://keygen.sh/docs/api/authentication/#license-authentication).
- `MIXED`: Allow both license token and license key authentication (each covered above).
- `NONE`: Disable the ability for licenses to authenticate with the API.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-machineLeasingStrategy) data.attributes.machineLeasingStrategy

stringoptional



The strategy used for leasing machines.



**Please note that a nil owner is significant for a `PER_USER` leasing strategy.** When a machine's owner is nil (or null), the sum of all machines with a nil owner will be counted towards the license's machine limit. Please make sure that you're assigning an owner to machines if you utilize this leasing strategy.



This defines how machines are leased and counted, especially i.r.t. the policy's max machines limit.



###### Options



- `PER_LICENSE`: Machines are counted per-license. For example, with a max machines value of 2, each license could have 2 machines. This is the default.
- `PER_USER`: Machines are counted per-user, per-license. For example, with a max machines value of 2, each user could have 2 machines per-license.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-processLeasingStrategy) data.attributes.processLeasingStrategy

stringoptional



The strategy used for leasing machine processes.



**Please note that a nil owner is significant for a `PER_USER` leasing strategy.** When a machine's owner is nil (or null), the sum of all processes belonging to a machine with a nil owner will be counted towards the license's process limit. Please make sure that you're assigning an owner to machines if you utilize this leasing strategy.



This defines how processes are leased and counted, especially i.r.t. the policy's max processes limit.



###### Options



- `PER_MACHINE`: Processes are counted per-machine. For example, given a policy with a max processes value of 5, each license could have up to 5 processes for each machine. This is the default.
- `PER_LICENSE`: Processes are counted per-license. For example, with a max processes value of 5, each license could have up to 5 processes combined across all machines.
- `PER_USER`: Processes are counted per-user, per-license. For example, with a max processes value of 5, each user could have up to 5 processes combined across all owned machines per-license.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-overageStrategy) data.attributes.overageStrategy

stringoptional



The strategy used for allowing machine, core, memory, disk, and process overages. Set to `NO_OVERAGE` to disable overages altogether (attempts to exceed a limit will then result in an error).



This defines an overage allowance for a license. This allowance effects a license's machine limit, machine core, memory, and disk limits, and its machine process limit. Giving a license an overage allowance may be beneficial in environments where rolling restarts of the application are common, or another situation where overages are expected. This lets you allow overages, bounded and unbounded, while handling the unique validation codes to ensure total license compliance.



###### Options



- `ALWAYS_ALLOW_OVERAGE`: The license may exceed its limits, and doing so will not effect the licenses validity, i.e. the following validation codes will return `valid=true`: `TOO_MANY_MACHINES`, `TOO_MANY_CORES`, `TOO_MUCH_MEMORY`, `TOO_MUCH_DISK`, `TOO_MANY_PROCESSES`.
- `ALLOW_1_25X_OVERAGE`: The license may exceed its limits, up to a maximum of 1.25x. Exceeding a limit will not effect the license's validity right away, i.e. the following validation codes will return `valid=true`: `TOO_MANY_MACHINES`, `TOO_MANY_CORES`, `TOO_MUCH_MEMORY`, `TOO_MUCH_DISK`, `TOO_MANY_PROCESSES`. The license will begin to fail validation once the 1.25x allowance has been exceeded. When using a 1.25x allowance, all resource limits must be divisible by 4.
- `ALLOW_1_5X_OVERAGE`: The license may exceed its limits, up to a maximum of 1.5x. Exceeding a limit will not effect the license's validity right away, i.e. the following validation codes will return `valid=true`: `TOO_MANY_MACHINES`, `TOO_MANY_CORES`, `TOO_MUCH_MEMORY`, `TOO_MUCH_DISK`, `TOO_MANY_PROCESSES`. The license will begin to fail validation once the 1.5x allowance has been exceeded. When using a 1.5x allowance, all resource limits must be divisible by 2.
- `ALLOW_2X_OVERAGE`: The license may exceed its limits, up to a maximum of 2x. Exceeding a limit will not effect the license's validity right away, i.e. the following validation codes will return `valid=true`: `TOO_MANY_MACHINES`, `TOO_MANY_CORES`, `TOO_MUCH_MEMORY`, `TOO_MUCH_DISK`, `TOO_MANY_PROCESSES`. The license will begin to fail validation once the 2x allowance has been exceeded.
- `NO_OVERAGE`: Do not allow overages. Attempts to exceed limits will fail. This is the default.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-attrs-metadata) data.attributes.metadata

object<string, any>optional



Object containing policy [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-relationships) Relationships

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-relationships-product) data.relationships.product

[linkage<product>](https://keygen.sh/docs/api/relationships/)required



The product the policy is for.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-create-returns) Returns

A `201 Created` response will be returned along with the new policy object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies
https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer {TOKEN}"
  },
  body: JSON.stringify({
    "data": {
      "type": "policies",
      "attributes": {
        "name": "Basic"
      },
      "relationships": {
        "product": {
          "data": { "type": "product", "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4" }
        }
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies", {
  method: "POST",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer {TOKEN}"
  },
  body: JSON.stringify({
    "data": {
      "type": "policies",
      "attributes": {
        "name": "Basic"
      },
      "relationships": {
        "product": {
          "data": { "type": "product", "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4" }
        }
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer {TOKEN}"
  },
  data=json.dumps({
    "data": {
      "type": "policies",
      "attributes": {
        "name": "Basic"
      },
      "relationships": {
        "product": {
          "data": { "type": "product", "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4" }
        }
      }
    }
  })
).json()
import requests
import json

res = requests.post(
  "https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer {TOKEN}"
  },
  data=json.dumps({
    "data": {
      "type": "policies",
      "attributes": {
        "name": "Basic"
      },
      "relationships": {
        "product": {
          "data": { "type": "product", "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4" }
        }
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer {TOKEN}"\
  ],
  parameters: [\
    "data": [\
      "type": "policies",\
      "attributes": [\
        "name": "Basic"\
      ],\
      "relationships": [\
        "product": [\
          "data": ["type": "product", "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"]\
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

Alamofire.request("https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies",
  method: .post,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer {TOKEN}"\
  ],
  parameters: [\
    "data": [\
      "type": "policies",\
      "attributes": [\
        "name": "Basic"\
      ],\
      "relationships": [\
        "product": [\
          "data": ["type": "product", "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"]\
        ]\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/{ACCOUNT}");
var request = new RestRequest("policies", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer {TOKEN}");

request.AddJsonBody(new {
  data = new {
    type = "policies",
    attributes = new {
      name = "Basic"
    },
    relationships = new {
      product = new {
        data = new { type = "product", id = "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4" }
      }
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/{ACCOUNT}");
var request = new RestRequest("policies", Method.POST);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer {TOKEN}");

request.AddJsonBody(new {
  data = new {
    type = "policies",
    attributes = new {
      name = "Basic"
    },
    relationships = new {
      product = new {
        data = new { type = "product", id = "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4" }
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
    "type" to "policies",
    "attributes" to mapOf(
      "name" to "Basic"
    ),
    "relationships" to mapOf(
      "product" to mapOf(
        "data" to mapOf(
          "type" to "products",
          "id" to "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"
        )
      )
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies")
  .header("Authorization", "Bearer {TOKEN}")
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
    "attributes" to mapOf(
      "name" to "Basic"
    ),
    "relationships" to mapOf(
      "product" to mapOf(
        "data" to mapOf(
          "type" to "products",
          "id" to "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"
        )
      )
    )
  )
))

val res = Unirest.post("https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies")
  .header("Authorization", "Bearer {TOKEN}")
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
    entry("attributes", ofEntries(
      entry("name", "Basic")
    )),
    entry("relationships", ofEntries(
      entry("product", ofEntries(
        entry("data", ofEntries(
          entry("type", "products"),
          entry("id", "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4")
        ))
      ))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies")
  .header("Authorization", "Bearer {TOKEN}")
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
    entry("attributes", ofEntries(
      entry("name", "Basic")
    )),
    entry("relationships", ofEntries(
      entry("product", ofEntries(
        entry("data", ofEntries(
          entry("type", "products"),
          entry("id", "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4")
        ))
      ))
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies")
  .header("Authorization", "Bearer {TOKEN}")
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

http_client client("https://api.keygen.sh/v1/accounts/{ACCOUNT}");
http_request req;

value attrs;
attrs["name"] = value::string("Basic");

value product_;
product_["type"] = value::string("products");
product_["id"] = value::string("3ab38aae-bbf7-4846-9c32-af9d94bf5ad4");

value product;
product["data"] = product_;

value rels;
rels["product"] = product;

value data;
data["type"] = value::string("policies");
data["attributes"] = attrs;
data["relationships"] = rels;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer {TOKEN}");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/policies");
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

http_client client("https://api.keygen.sh/v1/accounts/{ACCOUNT}");
http_request req;

value attrs;
attrs["name"] = value::string("Basic");

value product_;
product_["type"] = value::string("products");
product_["id"] = value::string("3ab38aae-bbf7-4846-9c32-af9d94bf5ad4");

value product;
product["data"] = product_;

value rels;
rels["product"] = product;

value data;
data["type"] = value::string("policies");
data["attributes"] = attrs;
data["relationships"] = rels;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer {TOKEN}");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/policies");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer {TOKEN}' \
  -d '{
        "data": {
          "type": "policies",
          "attributes": {
            "name": "Basic"
          },
          "relationships": {
            "product": {
              "data": { "type": "product", "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4" }
            }
          }
        }
      }'
curl -X POST https://api.keygen.sh/v1/accounts/{ACCOUNT}/policies \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer {TOKEN}' \
  -d '{
        "data": {
          "type": "policies",
          "attributes": {
            "name": "Basic"
          },
          "relationships": {
            "product": {
              "data": { "type": "product", "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4" }
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
    "id": "0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
    "type": "policies",
    "links": {
      "self": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"
    },
    "attributes": {
      "name": "Basic",
      "duration": null,
      "strict": false,
      "floating": false,
      "scheme": null,
      "requireProductScope": false,
      "requirePolicyScope": false,
      "requireMachineScope": false,
      "requireFingerprintScope": false,
      "requireComponentsScope": false,
      "requireUserScope": false,
      "requireChecksumScope": false,
      "requireVersionScope": false,
      "requireCheckIn": false,
      "checkInInterval": null,
      "checkInIntervalCount": null,
      "usePool": false,
      "maxMachines": 1,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": null,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "encrypted": false,
      "protected": false,
      "requireHeartbeat": false,
      "heartbeatDuration": null,
      "heartbeatCullStrategy": "DEACTIVATE_DEAD",
      "heartbeatResurrectionStrategy": "NO_REVIVE",
      "heartbeatBasis": "FROM_FIRST_PING",
      "machineUniquenessStrategy": "UNIQUE_PER_LICENSE",
      "machineMatchingStrategy": "MATCH_ALL",
      "componentUniquenessStrategy": "UNIQUE_PER_MACHINE",
      "componentMatchingStrategy": "MATCH_ALL",
      "expirationStrategy": "RESTRICT_ACCESS",
      "expirationBasis": "FROM_CREATION",
      "renewalBasis": "FROM_EXPIRY",
      "transferStrategy": "KEEP_EXPIRY",
      "authenticationStrategy": "TOKEN",
      "machineLeasingStrategy": "PER_LICENSE",
      "processLeasingStrategy": "PER_MACHINE",
      "overageStrategy": "NO_OVERAGE",
      "metadata": {},
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}"
        },
        "data": {
          "type": "accounts",
          "id": "{ACCOUNT}"
        }
      },
      "product": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/product"
        },
        "data": {
          "type": "products",
          "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"
        }
      },
      "pool": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/pool"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/licenses"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
    "type": "policies",
    "links": {
      "self": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"
    },
    "attributes": {
      "name": "Basic",
      "duration": null,
      "strict": false,
      "floating": false,
      "scheme": null,
      "requireProductScope": false,
      "requirePolicyScope": false,
      "requireMachineScope": false,
      "requireFingerprintScope": false,
      "requireComponentsScope": false,
      "requireUserScope": false,
      "requireChecksumScope": false,
      "requireVersionScope": false,
      "requireCheckIn": false,
      "checkInInterval": null,
      "checkInIntervalCount": null,
      "usePool": false,
      "maxMachines": 1,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": null,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "encrypted": false,
      "protected": false,
      "requireHeartbeat": false,
      "heartbeatDuration": null,
      "heartbeatCullStrategy": "DEACTIVATE_DEAD",
      "heartbeatResurrectionStrategy": "NO_REVIVE",
      "heartbeatBasis": "FROM_FIRST_PING",
      "machineUniquenessStrategy": "UNIQUE_PER_LICENSE",
      "machineMatchingStrategy": "MATCH_ALL",
      "componentUniquenessStrategy": "UNIQUE_PER_MACHINE",
      "componentMatchingStrategy": "MATCH_ALL",
      "expirationStrategy": "RESTRICT_ACCESS",
      "expirationBasis": "FROM_CREATION",
      "renewalBasis": "FROM_EXPIRY",
      "transferStrategy": "KEEP_EXPIRY",
      "authenticationStrategy": "TOKEN",
      "machineLeasingStrategy": "PER_LICENSE",
      "processLeasingStrategy": "PER_MACHINE",
      "overageStrategy": "NO_OVERAGE",
      "metadata": {},
      "created": "2017-01-02T20:26:53.464Z",
      "updated": "2017-01-02T20:26:53.464Z"
    },
    "relationships": {
      "account": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}"
        },
        "data": {
          "type": "accounts",
          "id": "{ACCOUNT}"
        }
      },
      "product": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/product"
        },
        "data": {
          "type": "products",
          "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"
        }
      },
      "pool": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/pool"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/licenses"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/{ACCOUNT}/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/policies/\#policies-retrieve) Retrieve a policy

Retrieves the details of an existing policy.

### [_link_](https://keygen.sh/docs/api/policies/\#policies-retrieve-permissions) Required permissions

- policy.read

### [_link_](https://keygen.sh/docs/api/policies/\#policies-retrieve-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-retrieve-auths-bearer) Bearer

required



An authentication token with privileges to view the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-retrieve-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-retrieve-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-retrieve-params-id) <id>

stringrequired



The identifier (UUID) of the policy to be retrieved.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-retrieve-returns) Returns

A `200 OK` response will be returned along with a policy object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/policies/<id>
https://api.keygen.sh/v1/accounts/<account>/policies/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065", {
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
  "https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
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
  "policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  Method.GET
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
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

req.set_request_uri("/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065");
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

req.set_request_uri("/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065");
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
    "type": "policies",
    "links": {
      "self": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"
    },
    "attributes": {
      "name": "Premium Add-On",
      "duration": 1209600,
      "strict": false,
      "floating": true,
      "scheme": null,
      "requireProductScope": false,
      "requirePolicyScope": false,
      "requireMachineScope": false,
      "requireFingerprintScope": false,
      "requireComponentsScope": false,
      "requireUserScope": false,
      "requireChecksumScope": false,
      "requireVersionScope": false,
      "requireCheckIn": false,
      "checkInInterval": null,
      "checkInIntervalCount": null,
      "usePool": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": null,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "encrypted": false,
      "protected": false,
      "requireHeartbeat": false,
      "heartbeatDuration": null,
      "heartbeatCullStrategy": "DEACTIVATE_DEAD",
      "machineUniquenessStrategy": "UNIQUE_PER_LICENSE",
      "machineMatchingStrategy": "MATCH_ALL",
      "componentUniquenessStrategy": "UNIQUE_PER_MACHINE",
      "componentMatchingStrategy": "MATCH_ALL",
      "expirationStrategy": "RESTRICT_ACCESS",
      "expirationBasis": "FROM_CREATION",
      "renewalBasis": "FROM_EXPIRY",
      "transferStrategy": "KEEP_EXPIRY",
      "authenticationStrategy": "TOKEN",
      "machineLeasingStrategy": "PER_LICENSE",
      "processLeasingStrategy": "PER_MACHINE",
      "overageStrategy": "NO_OVERAGE",
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
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/product"
        },
        "data": {
          "type": "products",
          "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"
        }
      },
      "pool": {
        "links": {
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/pool"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/licenses"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
    "type": "policies",
    "links": {
      "self": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"
    },
    "attributes": {
      "name": "Premium Add-On",
      "duration": 1209600,
      "strict": false,
      "floating": true,
      "scheme": null,
      "requireProductScope": false,
      "requirePolicyScope": false,
      "requireMachineScope": false,
      "requireFingerprintScope": false,
      "requireComponentsScope": false,
      "requireUserScope": false,
      "requireChecksumScope": false,
      "requireVersionScope": false,
      "requireCheckIn": false,
      "checkInInterval": null,
      "checkInIntervalCount": null,
      "usePool": false,
      "maxMachines": 5,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": null,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "encrypted": false,
      "protected": false,
      "requireHeartbeat": false,
      "heartbeatDuration": null,
      "heartbeatCullStrategy": "DEACTIVATE_DEAD",
      "machineUniquenessStrategy": "UNIQUE_PER_LICENSE",
      "machineMatchingStrategy": "MATCH_ALL",
      "componentUniquenessStrategy": "UNIQUE_PER_MACHINE",
      "componentMatchingStrategy": "MATCH_ALL",
      "expirationStrategy": "RESTRICT_ACCESS",
      "expirationBasis": "FROM_CREATION",
      "renewalBasis": "FROM_EXPIRY",
      "transferStrategy": "KEEP_EXPIRY",
      "authenticationStrategy": "TOKEN",
      "machineLeasingStrategy": "PER_LICENSE",
      "processLeasingStrategy": "PER_MACHINE",
      "overageStrategy": "NO_OVERAGE",
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
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/product"
        },
        "data": {
          "type": "products",
          "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"
        }
      },
      "pool": {
        "links": {
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/pool"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/licenses"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/policies/\#policies-update) Update a policy

Updates the specified policy resource by setting the values of the parameters
passed. Any parameters not provided will be left unchanged.

### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-permissions) Required permissions

- policy.update

### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-params-id) <id>

stringrequired



The identifier (UUID) of the policy to be updated.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs) Attributes

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-name) data.attributes.name

stringoptional



The name of the policy.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-duration) data.attributes.duration

integeroptional



The duration for the policy in seconds. When a new license implements the policy, the license's expiry is calculated with this value (i.e. `time.now + policy.duration`). If `null`, licenses will never expire. Updating this attribute _will not_ retroactively update previously created licenses.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-strict) data.attributes.strict

booleanoptional



When enabled, a license that implements the policy may be considered invalid if its machine limit, machine core, memory, or disk limits, or machine processes limit is surpassed, according to the policy's overage strategy. In addition, strict requires a license to have at least 1 machine associated with it in order to pass validation.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-floating) data.attributes.floating

booleanoptional



When enabled, a license that implements the policy will be valid across multiple machines. Though this is not enforced i.e. it does not invalidate a license if it's associated with more than 1 machine unless the policy is strict.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-requireProductScope) data.attributes.requireProductScope

booleanoptional



When enabled, validating a license that implements the policy will require a product scope that matches the licenses's product relationship by its identifier (UUID).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-requirePolicyScope) data.attributes.requirePolicyScope

booleanoptional



When enabled, validating a license that implements the policy will require a policy scope that matches the licenses's policy relationship by its identifier (UUID).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-requireMachineScope) data.attributes.requireMachineScope

booleanoptional



When enabled, validating a license that implements the policy will require a machine scope that matches at least 1 of the licenses's machine relationships by its identifier (UUID).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-requireFingerprintScope) data.attributes.requireFingerprintScope

booleanoptional



When enabled, validating a license that implements the policy will require a fingerprint scope that matches at least 1 of the licenses's machine relationships by its fingerprint.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-requireComponentsScope) data.attributes.requireComponentsScope

booleanoptional



When enabled, validating a license that implements the policy will require a components scope that matches at least 1 of the licenses's machine components by its fingerprint.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-requireUserScope) data.attributes.requireUserScope

booleanoptional



When enabled, validating a license that implements the policy will require a user scope that matches the license's user relationship.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-requireChecksumScope) data.attributes.requireChecksumScope

booleanoptional



When enabled, validating a license that implements the policy will require a checksum scope to be provided, matching an accessible artifact for the license.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-requireVersionScope) data.attributes.requireVersionScope

booleanoptional



When enabled, validating a license that implements the policy will require a version scope to be provided, matching an accessible release for the license.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-requireCheckIn) data.attributes.requireCheckIn

booleanoptional



When enabled, a license that implements the policy will require check-in at a predefined interval to continue to pass validation i.e. if a license misses a check-in, it will be invalidated.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-checkInInterval) data.attributes.checkInInterval

stringoptional



One of `day`, `week`, `month` or `year`. The frequency at which a license should check-in.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-checkInIntervalCount) data.attributes.checkInIntervalCount

integeroptional



The number of intervals (specified in the check-in interval property) between each required check-in. For example, `checkInInterval=week` and `checkInIntervalCount=2` requires check-in every 2 weeks. Must be a number between 1 and 365 inclusive.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-maxMachines) data.attributes.maxMachines

integeroptional



The maximum number of machines a license implementing the policy can have associated with it. This is only enforced when the policy is strict. When `null`, an unlimited number of machines may be associated with a license if the policy is floating. Must be a number greater than 0, and must be equal to 1 for non-floating policies.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-maxProcesses) data.attributes.maxProcesses

integeroptional



The maximum number of machine processes a license implementing the policy can have associated with it, also depending on the policy's leasing strategy. When `null`, an unlimited number of machine processes may be associated with a license. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-maxUsers) data.attributes.maxUsers

integeroptional



The maximum number of users a license implementing the policy can have associated with it. When `null`, an unlimited number of users may be associated with a license. Must be a number greater than 0.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-maxCores) data.attributes.maxCores

integeroptional



The maximum number of machine CPU cores a license implementing the policy can have associated with it. The count is the sum of all cores for a license's machines. When `null`, a license which implements the policy can have an unlimited number of CPU cores.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-maxMemory) data.attributes.maxMemory

integeroptional



The maximum amount of machine memory, in bytes, a license implementing the policy can have associated with it. The count is the sum of all memory across a license's machines. When `null`, a license which implements the policy can consume unlimited memory.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-maxDisk) data.attributes.maxDisk

integeroptional



The maximum amount of machine disk, in bytes, a license implementing the policy can have associated with it. The count is the sum of all disk across a license's machines. When `null`, a license which implements the policy can consume unlimited disk.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-maxUses) data.attributes.maxUses

integeroptional



The maximum number of uses a license implementing the policy can have. Cannot exceed `2,147,483,647`, which is the maximum value of a 4 byte integer. When `null`, a license which implements the policy can have an unlimited number of uses.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-protected) data.attributes.protected

booleanoptional



Whether or not the policy is protected. A protected policy disallows users the ability to create licenses themselves, useful in situations where Keygen is only managed server-side.



Unprotected policies are particularly useful for trial policies alongside user profiles, since they allow a user to create a license implementing the unprotected trial policy, but the user cannot create or transfer a license to a protected paid policy. Upgrades then, from trial to paid, would need to be handled server-side, e.g. after an event from your payment provider.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-requireHeartbeat) data.attributes.requireHeartbeat

booleanoptional



Whether or not the policy requires its machines to maintain a heartbeat. When enabled, machines that do not have a heartbeat will fail validation with a `HEARTBEAT_NOT_STARTED` validation code. Otherwise, heartbeats are optional.



**Please note: updating a policy from not requiring heartbeats to requiring heartbeats will cause all existing machines without a heartbeat to be considered dead after a short idling period, according to the policy's heartbeat duration.** This means that any existing machines MAY be deactivated if they are not already maintaining consistent heartbeat pings.



Please note: this only applies to machines, not processes. Processes always require a heartbeat.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-heartbeatDuration) data.attributes.heartbeatDuration

integeroptional



The heartbeat duration for the policy, in seconds. When a machine has an active heartbeat monitor, the machine must send heartbeat pings within this timeframe to remain activated. Must be greater than or equal to 1 minute (60).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-heartbeatCullStrategy) data.attributes.heartbeatCullStrategy

stringoptional



The strategy used for culling dead machines and processes.



Please note: dead machines will not pass license validation. The resulting failed validation code will be `HEARTBEAT_DEAD`.



###### Options



- `DEACTIVATE_DEAD`: Automatically deactivate machines that fail to maintain their heartbeat pings. This is the default.
- `KEEP_DEAD`: Mark machines that fail to maintain their heartbeat pings as dead, but do not deactivate.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-heartbeatResurrectionStrategy) data.attributes.heartbeatResurrectionStrategy

stringoptional



The strategy used for controlling whether or not dead machines and processes can be resurrected shortly after death. A resurrection occurs when a heartbeat ping is sent to a dead machine or process that is within its resurrection window.



Please note: dead machines will not pass license validation. The resulting failed validation code will be `HEARTBEAT_DEAD`.



###### Options



- `NO_REVIVE`: Do not allow dead machines and processes to be revived. This is the default.
- `1_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 1 minute from its time of death.
- `2_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 2 minutes from its time of death.
- `5_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 5 minutes from its time of death.
- `10_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 10 minutes from its time of death.
- `15_MINUTE_REVIVE`: A machine or process can be revived if it sends a ping within 15 minutes from its time of death.
- `ALWAYS_REVIVE`: A machine or process can always be revived. Requires a cull strategy of `KEEP_DEAD`.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-heartbeatBasis) data.attributes.heartbeatBasis

stringoptional



Control when a machine's initial heartbeat is started. By default, a machine's heartbeat is started on creation when its policy requires a heartbeat. Overwise, it is started on first ping.



Please note: this only applies to machines, not processes. Processes always have a heartbeat basis of `FROM_CREATION`, because their heartbeat is required.



###### Options



- `FROM_CREATION`: Machine heartbeat is started immediately upon creation.
- `FROM_FIRST_PING`: Mahine heartbeat is started after their first heartbeat ping event.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-machineUniquenessStrategy) data.attributes.machineUniquenessStrategy

stringoptional



The uniqueness validation strategy for machine fingerprints. You can utilize this to prevent duplicate fingerprints across a variety of scopes.



This can be especially useful for disallowing trial licenses for a specific machine (i.e. device) that had previously completed a trial evaluation using another trial license. You would set the trial policy to `UNIQUE_PER_POLICY`, and then set any non-trial policies to `UNIQUE_PER_LICENSE`. This would effectively block a machine from using multiple trial licenses, while still allowing the machine to be associated with non-trial licenses.



###### Options



- `UNIQUE_PER_ACCOUNT`: Machine fingerprints must be unique across the entire Keygen account. This will block all duplicate fingerprints, regardless of whether or not the fingerprint belongs to another product, policy or license.
- `UNIQUE_PER_PRODUCT`: Machine fingerprints must be unique across all licenses belonging to a product. This will block all duplicate fingerprints of the same product, regardless of whether or not the fingerprint belongs to another policy or license.
- `UNIQUE_PER_POLICY`: Machine fingerprints must be unique across all licenses for the policy. This will block all duplicate fingerprints of the same policy, regardless of whether or not the fingerprint belongs to another license.
- `UNIQUE_PER_LICENSE`: Machine fingerprints must be unique to the license. This will block all duplicate fingerprints for same license, but the same fingerprint can exist across different licenses. This is the default.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-machineMatchingStrategy) data.attributes.machineMatchingStrategy

stringoptional



The matching strategy for machine fingerprints supplied during a license validation.



###### Options



- `MATCH_ANY`: At least 1 of the supplied fingerprints must match a fingerprint for the license's associated machines. E.g. if 3 fingerprints are supplied, at least 1 of them must match.
- `MATCH_TWO`: At least 2 of the supplied fingerprints must match a fingerprint for the license's associated machines. E.g. if 4 fingerprints are supplied, at least 2 of them must match.
- `MATCH_MOST`: The majority of supplied fingerprints must match the fingerprints for the license's associated machines. E.g. if 3 fingerprints are supplied, at least 2 of them must match.
- `MATCH_ALL`: All supplied fingerprints must match the fingerprints for the license's associated machines. E.g. if 3 fingerprints are supplied, all 3 of them must match.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-componentUniquenessStrategy) data.attributes.componentUniquenessStrategy

stringoptional



The uniqueness validation strategy for component fingerprints. You can utilize this to prevent duplicate fingerprints across a variety of scopes.



This is especially useful for disallowing trial licenses for specific hardware that had previously completed a trial evaluation using another trial machine or license. You would set the trial policy to `UNIQUE_PER_POLICY`, and then set any non-trial policies to `UNIQUE_PER_LICENSE`. This would effectively block a device from using multiple trials even if e.g. the operating system was reinstalled.



###### Options



- `UNIQUE_PER_ACCOUNT`: Component fingerprints must be unique across the entire Keygen account. This will block all duplicate fingerprints, regardless of whether or not the fingerprint belongs to another product, policy or license.
- `UNIQUE_PER_PRODUCT`: Component fingerprints must be unique across all licenses belonging to a product. This will block all duplicate fingerprints of the same product, regardless of whether or not the fingerprint belongs to another policy or license.
- `UNIQUE_PER_POLICY`: Component fingerprints must be unique across all licenses for the policy. This will block all duplicate fingerprints of the same policy, regardless of whether or not the fingerprint belongs to another license.
- `UNIQUE_PER_LICENSE`: Component fingerprints must also be unique to the license. This will block all duplicate fingerprints for same license, but the same fingerprint can exist across different licenses.
- `UNIQUE_PER_MACHINE`: Component fingerprints must be unique to the machine. This will allow the same component to exist across multiple machines for the same license. This is the default.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-componentMatchingStrategy) data.attributes.componentMatchingStrategy

stringoptional



The matching strategy for component fingerprints supplied during a license validation.



This is especially useful for managing individual hardware components of a given device, e.g. HDD ID, mobo ID, MAC addresses, IP addresses, etc., and then requiring that some, most, or all components match during a license validation. These can be managed through the [components resource](https://keygen.sh/docs/api/components/).



###### Options



- `MATCH_ANY`: At least 1 of the supplied fingerprints must match a fingerprint for the machine's associated components. E.g. if 3 fingerprints are supplied, at least 1 of them must match.
- `MATCH_TWO`: At least 2 of the supplied fingerprints must match a fingerprint for the machine's associated components. E.g. if 4 fingerprints are supplied, at least 2 of them must match.
- `MATCH_MOST`: The majority of supplied fingerprints must match the fingerprints for the machine's associated components. E.g. if 3 fingerprints are supplied, at least 2 of them must match.
- `MATCH_ALL`: All supplied fingerprints must match the fingerprints for the machine's associated components. E.g. if 3 fingerprints are supplied, all 3 of them must match.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-expirationStrategy) data.attributes.expirationStrategy

stringoptional



The strategy for expired licenses during a license validation and when accessing releases.



This is useful in scenarios where you want to allow normal product usage for expired licenses and access to older releases published prior their expiry, but restrict access to newer releases published after the expiry (commonly called a perpetual-fallback license), or when a license has a maintenance window after which upgrades are paused until renewal. Expiration strategies may also change license validation and authentication behavior ( [read more](https://keygen.sh/docs/api/authentication/#expirations-and-suspensions)).



###### Options



- `RESTRICT_ACCESS`: Expired licenses can continue to access releases published prior to their license expiry. Automatic upgrades are enabled, but only for releases published prior to their expiry. Validation scopes take precedence over expiry check during license validation. This is the default.
- `REVOKE_ACCESS`: Expired licenses are no longer able to access any releases, including past releases. Automatic upgrades are disabled. Expiry check takes precedence over scopes during license validation.
- `MAINTAIN_ACCESS`: Expired licenses can continue to access releases published prior to their license expiry. Automatic upgrades are enabled, but only for releases published prior to their expiry. Validation scopes take precedence over expiry check during license validation. In addition, validations with an `EXPIRED` code will return `valid=true`. This is commonly used for perpetual-fallback licenses.
- `ALLOW_ACCESS`: Expired licenses can access any releases, including past releases and future releases. Automatic upgrades are enabled. Validation scopes take precedence over expiry check during license validation. In addition, validations with an `EXPIRED` code will return `valid=true`.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-expirationBasis) data.attributes.expirationBasis

stringoptional



Control when a license's initial expiry is set. By default, a license's expiration date is set on creation.



###### Options



- `FROM_CREATION`: License expirations are set immediately upon creation.
- `FROM_FIRST_VALIDATION`: License expirations are set after their first license validation event.
- `FROM_FIRST_ACTIVATION`: License expirations are set after their first machine activation event.
- `FROM_FIRST_DOWNLOAD`: License expirations are set after their first release download event.
- `FROM_FIRST_USE`: License expirations are set after their first usage increment event.

Note: "usage" is **not** activation or validation.`FROM_FIRST_USE` is for [a license's usage](https://keygen.sh/docs/api/licenses/#licenses-actions-increment-usage).

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-renewalBasis) data.attributes.renewalBasis

stringoptional



Control how a license's expiry is extended during renewal. For example, you may want to extend the license's expiry from the current time, instead of from the license's current expiry value.



###### Options



- `FROM_EXPIRY`: License expiry is extended from the license's current expiry value, i.e. `license.expiry = license.expiry + policy.duration`. This is the default.
- `FROM_NOW`: License expiry is extended from the current time, i.e. `license.expiry = time.now + policy.duration`.
- `FROM_NOW_IF_EXPIRED`: Conditionally extend license expiry from the current time if the license is expired, otherwise extend from the license's current expiry value.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-transferStrategy) data.attributes.transferStrategy

stringoptional



Control whether a license's expiration is reset when transferred to this policy.



This is especially useful when transferring a license from a policy with a short duration to one with a longer duration. For example, upgrading from a 14 day free trial license to a yearly license.



###### Options



- `RESET_EXPIRY`: Reset the transferred license's expiry from the time of transfer. For example, if the license had an expiry 3 months from now, and the new policy has a duration of 1 year, transferring would reset the expiry to 1 year from the time of transfer. When the policy has no duration, the license's expiry is removed.
- `KEEP_EXPIRY`: Do not change the license's current expiry. This is the default.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-authenticationStrategy) data.attributes.authenticationStrategy

stringoptional



The strategy used for authenticating as a license, for client-side integrations.



###### Options



- `TOKEN`: Allow licenses to authenticate using [a license token](https://keygen.sh/docs/api/authentication/#license-tokens). This is the default.
- `LICENSE`: Allow licenses to authenticate using [a license key](https://keygen.sh/docs/api/authentication/#license-authentication).
- `MIXED`: Allow both license token and license key authentication (each covered above).
- `NONE`: Disable the ability for licenses to authenticate with the API.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-machineLeasingStrategy) data.attributes.machineLeasingStrategy

stringoptional



The strategy used for leasing machines.



**Please note that a nil owner is significant for a `PER_USER` leasing strategy.** When a machine's owner is nil (or null), the sum of all machines with a nil owner will be counted towards the license's machine limit. Please make sure that you're assigning an owner to machines if you utilize this leasing strategy.



This defines how machines are leased and counted, especially i.r.t. the policy's max machines limit.



###### Options



- `PER_LICENSE`: Machines are counted per-license. For example, with a max machines value of 2, each license could have 2 machines. This is the default.
- `PER_USER`: Machines are counted per-user, per-license. For example, with a max machines value of 2, each user could have 2 machines per-license.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-processLeasingStrategy) data.attributes.processLeasingStrategy

stringoptional



The strategy used for leasing machine processes.



**Please note that a nil owner is significant for a `PER_USER` leasing strategy.** When a machine's owner is nil (or null), the sum of all processes belonging to a machine with a nil owner will be counted towards the license's process limit. Please make sure that you're assigning an owner to machines if you utilize this leasing strategy.



This defines how processes are leased and counted, especially i.r.t. the policy's max processes limit.



###### Options



- `PER_MACHINE`: Processes are counted per-machine. For example, given a policy with a max processes value of 5, each license could have up to 5 processes for each machine. This is the default.
- `PER_LICENSE`: Processes are counted per-license. For example, with a max processes value of 5, each license could have up to 5 processes combined across all machines.
- `PER_USER`: Processes are counted per-user, per-license. For example, with a max processes value of 5, each user could have up to 5 processes combined across all owned machines per-license.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-overageStrategy) data.attributes.overageStrategy

stringoptional



The strategy used for allowing machine, core, memory, disk, and process overages. Set to `NO_OVERAGE` to disable overages altogether (attempts to exceed a limit will then result in an error).



This defines an overage allowance for a license. This allowance effects a license's machine limit, machine core, memory, and disk limits, and its machine process limit. Giving a license an overage allowance may be beneficial in environments where rolling restarts of the application are common, or another situation where overages are expected. This lets you allow overages, bounded and unbounded, while handling the unique validation codes to ensure total license compliance.



###### Options



- `ALWAYS_ALLOW_OVERAGE`: The license may exceed its limits, and doing so will not effect the licenses validity, i.e. the following validation codes will return `valid=true`: `TOO_MANY_MACHINES`, `TOO_MANY_CORES`, `TOO_MUCH_MEMORY`, `TOO_MUCH_DISK`, `TOO_MANY_PROCESSES`.
- `ALLOW_1_25X_OVERAGE`: The license may exceed its limits, up to a maximum of 1.25x. Exceeding a limit will not effect the license's validity right away, i.e. the following validation codes will return `valid=true`: `TOO_MANY_MACHINES`, `TOO_MANY_CORES`, `TOO_MUCH_MEMORY`, `TOO_MUCH_DISK`, `TOO_MANY_PROCESSES`. The license will begin to fail validation once the 1.25x allowance has been exceeded. When using a 1.25x allowance, all resource limits must be divisible by 4.
- `ALLOW_1_5X_OVERAGE`: The license may exceed its limits, up to a maximum of 1.5x. Exceeding a limit will not effect the license's validity right away, i.e. the following validation codes will return `valid=true`: `TOO_MANY_MACHINES`, `TOO_MANY_CORES`, `TOO_MUCH_MEMORY`, `TOO_MUCH_DISK`, `TOO_MANY_PROCESSES`. The license will begin to fail validation once the 1.5x allowance has been exceeded. When using a 1.5x allowance, all resource limits must be divisible by 2.
- `ALLOW_2X_OVERAGE`: The license may exceed its limits, up to a maximum of 2x. Exceeding a limit will not effect the license's validity right away, i.e. the following validation codes will return `valid=true`: `TOO_MANY_MACHINES`, `TOO_MANY_CORES`, `TOO_MUCH_MEMORY`, `TOO_MUCH_DISK`, `TOO_MANY_PROCESSES`. The license will begin to fail validation once the 2x allowance has been exceeded.
- `NO_OVERAGE`: Do not allow overages. Attempts to exceed limits will fail. This is the default.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-attrs-metadata) data.attributes.metadata

object<string, any>optional



Object containing policy [metadata](https://keygen.sh/docs/api/metadata/).


### [_link_](https://keygen.sh/docs/api/policies/\#policies-update-returns) Returns

A `200 OK` response will be returned along with the updated policy object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/policies/<id>
https://api.keygen.sh/v1/accounts/<account>/policies/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "policies",
      "attributes": {
        "maxMachines": 15
      }
    }
  })
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  body: JSON.stringify({
    "data": {
      "type": "policies",
      "attributes": {
        "maxMachines": 15
      }
    }
  })
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "policies",
      "attributes": {
        "maxMachines": 15
      }
    }
  })
).json()
import requests
import json

res = requests.patch(
  "https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  headers={
    "Content-Type": "application/vnd.api+json",
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  },
  data=json.dumps({
    "data": {
      "type": "policies",
      "attributes": {
        "maxMachines": 15
      }
    }
  })
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "policies",\
      "attributes": [\
        "maxMachines": 15\
      ]\
    ]\
  ],
  encoding: JSONEncoding.default
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  method: .patch,
  headers: [\
    "Content-Type": "application/vnd.api+json",\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ],
  parameters: [\
    "data": [\
      "type": "policies",\
      "attributes": [\
        "maxMachines": 15\
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
  "policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "policies",
    attributes = new {
      maxMachines = 15
    }
  }
});

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  Method.PATCH
);

request.AddHeader("Content-Type", "application/vnd.api+json");
request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddJsonBody(new {
  data = new {
    type = "policies",
    attributes = new {
      maxMachines = 15
    }
  }
});

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*
import org.json.*

val body = JSONObject(mapOf(
  "data" to mapOf(
    "type" to "policies",
    "attributes" to mapOf(
      "maxMachines" to 15
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
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
    "attributes" to mapOf(
      "maxMachines" to 15
    )
  )
))

val res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
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
    entry("attributes", ofEntries(
      entry("maxMachines", 15)
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
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
    entry("attributes", ofEntries(
      entry("maxMachines", 15)
    ))
  ))
));

HttpResponse<JsonNode> res = Unirest.patch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
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
attrs["maxMachines"] = value::number(15);

value data;
data["type"] = value::string("policies");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065");
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
attrs["maxMachines"] = value::number(15);

value data;
data["type"] = value::string("policies");
data["attributes"] = attrs;

value body;
body["data"] = data;

req.headers().add("Authorization", "Bearer <token>");
req.headers().add("Content-Type", "application/vnd.api+json");
req.headers().add("Accept", "application/json");

req.set_request_uri("/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065");
req.set_method(methods::PATCH);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X PATCH https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "policies",
          "attributes": {
            "maxMachines": 15
          }
        }
      }'
curl -X PATCH https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065 \
  -H 'Content-Type: application/vnd.api+json' \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>' \
  -d '{
        "data": {
          "type": "policies",
          "attributes": {
            "maxMachines": 15
          }
        }
      }'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
    "type": "policies",
    "links": {
      "self": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"
    },
    "attributes": {
      "name": "Premium Add-On",
      "duration": 1209600,
      "strict": false,
      "floating": true,
      "scheme": null,
      "requireProductScope": false,
      "requirePolicyScope": false,
      "requireMachineScope": false,
      "requireFingerprintScope": false,
      "requireComponentsScope": false,
      "requireUserScope": false,
      "requireChecksumScope": false,
      "requireVersionScope": false,
      "requireCheckIn": false,
      "checkInInterval": null,
      "checkInIntervalCount": null,
      "usePool": false,
      "maxMachines": 15,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": null,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "encrypted": false,
      "protected": false,
      "requireHeartbeat": false,
      "heartbeatDuration": null,
      "heartbeatCullStrategy": "DEACTIVATE_DEAD",
      "heartbeatResurrectionStrategy": "NO_REVIVE",
      "heartbeatBasis": "FROM_FIRST_PING",
      "machineUniquenessStrategy": "UNIQUE_PER_LICENSE",
      "machineMatchingStrategy": "MATCH_ALL",
      "componentUniquenessStrategy": "UNIQUE_PER_MACHINE",
      "componentMatchingStrategy": "MATCH_ALL",
      "expirationStrategy": "RESTRICT_ACCESS",
      "expirationBasis": "FROM_CREATION",
      "renewalBasis": "FROM_EXPIRY",
      "transferStrategy": "KEEP_EXPIRY",
      "authenticationStrategy": "TOKEN",
      "machineLeasingStrategy": "PER_LICENSE",
      "processLeasingStrategy": "PER_MACHINE",
      "overageStrategy": "NO_OVERAGE",
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
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/product"
        },
        "data": {
          "type": "products",
          "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"
        }
      },
      "pool": {
        "links": {
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/pool"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/licenses"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements"
        }
      }
    }
  }
}
{
  "data": {
    "id": "0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
    "type": "policies",
    "links": {
      "self": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"
    },
    "attributes": {
      "name": "Premium Add-On",
      "duration": 1209600,
      "strict": false,
      "floating": true,
      "scheme": null,
      "requireProductScope": false,
      "requirePolicyScope": false,
      "requireMachineScope": false,
      "requireFingerprintScope": false,
      "requireComponentsScope": false,
      "requireUserScope": false,
      "requireChecksumScope": false,
      "requireVersionScope": false,
      "requireCheckIn": false,
      "checkInInterval": null,
      "checkInIntervalCount": null,
      "usePool": false,
      "maxMachines": 15,
      "maxProcesses": null,
      "maxUsers": null,
      "maxCores": null,
      "maxMemory": null,
      "maxDisk": null,
      "maxUses": null,
      "encrypted": false,
      "protected": false,
      "requireHeartbeat": false,
      "heartbeatDuration": null,
      "heartbeatCullStrategy": "DEACTIVATE_DEAD",
      "heartbeatResurrectionStrategy": "NO_REVIVE",
      "heartbeatBasis": "FROM_FIRST_PING",
      "machineUniquenessStrategy": "UNIQUE_PER_LICENSE",
      "machineMatchingStrategy": "MATCH_ALL",
      "componentUniquenessStrategy": "UNIQUE_PER_MACHINE",
      "componentMatchingStrategy": "MATCH_ALL",
      "expirationStrategy": "RESTRICT_ACCESS",
      "expirationBasis": "FROM_CREATION",
      "renewalBasis": "FROM_EXPIRY",
      "transferStrategy": "KEEP_EXPIRY",
      "authenticationStrategy": "TOKEN",
      "machineLeasingStrategy": "PER_LICENSE",
      "processLeasingStrategy": "PER_MACHINE",
      "overageStrategy": "NO_OVERAGE",
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
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/product"
        },
        "data": {
          "type": "products",
          "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"
        }
      },
      "pool": {
        "links": {
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/pool"
        }
      },
      "licenses": {
        "links": {
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/licenses"
        }
      },
      "entitlements": {
        "links": {
          "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/policies/\#policies-delete) Delete a policy

Permanently deletes a policy. It cannot be undone. This action also immediately
deletes any licenses that the policy is associated with.

### [_link_](https://keygen.sh/docs/api/policies/\#policies-delete-permissions) Required permissions

- policy.delete

### [_link_](https://keygen.sh/docs/api/policies/\#policies-delete-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-delete-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-delete-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-delete-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-delete-params-id) <id>

stringrequired



The identifier (UUID) of the policy to be deleted.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-delete-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/policies/<id>
https://api.keygen.sh/v1/accounts/<account>/policies/<id>
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})
content_copyimport requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
import requests

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
)
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
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
  "policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);

content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065")
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

req.set_request_uri("/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065");
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

req.set_request_uri("/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065");
req.set_method(methods::DELETE);

client.request(req)
  .then([](http_response res) {
    auto status = res.status_code();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065 \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 204 No Content

```
No content
No content
```

## [_link_](https://keygen.sh/docs/api/policies/\#policies-list) List all policies

Returns a list of policies. The policies are returned sorted by creation date,
with the most recent policies appearing first. Resources are automatically
scoped to the authenticated bearer e.g. when authenticated as a product,
only policies of that specific product will be listed.

### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-permissions) Required permissions

- policy.read

### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-auths-bearer) Bearer

required



An authentication token with privileges to view the resources: either an admin or a product.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-query-limit) limit

integerdefault=10



A limit on the number of policies to be returned. Limit must be a number between 1 and 100.





```
/v1/accounts/<account>/policies?limit=25
/v1/accounts/<account>/policies?limit=25
```

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-query-page) page

object<string, integer>



Object containing page `size` and page `number`. Page size must be a number between 1 and 100.





```
/v1/accounts/<account>/policies?page[size]=15&page[number]=2
/v1/accounts/<account>/policies?page[size]=15&page[number]=2
```

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-query-product) product

string



The identifier (UUID) of the product to filter by.





```
/v1/accounts/<account>/policies?product=3ab38aae-bbf7-4846-9c32-af9d94bf5ad4
/v1/accounts/<account>/policies?product=3ab38aae-bbf7-4846-9c32-af9d94bf5ad4
```


### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-returns) Returns

A `200 OK` response will be returned along with a list of policy objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/policies
https://api.keygen.sh/v1/accounts/<account>/policies
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies?limit=15", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies?limit=15", {
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
  "https://api.keygen.sh/v1/accounts/<account>/policies?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/policies?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
content_copyusing RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("policies", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest("policies", Method.GET);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

request.AddParameter("limit", 15);

var response = client.Execute(request);
content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/policies")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/policies")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/policies")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/policies")
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

uri_builder uri("/policies");
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

uri_builder uri("/policies");
uri.append_query("limit", 15);

req.set_request_uri(uri.to_uri());
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/policies?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/policies?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": [\
    {\
      "id": "0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",\
      "type": "policies",\
      "links": {\
        "self": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"\
      },\
      "attributes": {\
        "name": "Premium Add-On",\
        "duration": 1209600,\
        "strict": false,\
        "floating": true,\
        "scheme": null,\
        "requireProductScope": false,\
        "requirePolicyScope": false,\
        "requireMachineScope": false,\
        "requireFingerprintScope": false,\
        "requireComponentsScope": false,\
        "requireUserScope": false,\
        "requireChecksumScope": false,\
        "requireVersionScope": false,\
        "requireCheckIn": false,\
        "checkInInterval": null,\
        "checkInIntervalCount": null,\
        "usePool": false,\
        "maxMachines": 5,\
        "maxProcesses": null,\
        "maxUsers": null,\
        "maxCores": null,\
        "maxMemory": null,\
        "maxDisk": null,\
        "maxUses": null,\
        "encrypted": false,\
        "protected": false,\
        "requireHeartbeat": false,\
        "heartbeatDuration": null,\
        "heartbeatCullStrategy": "DEACTIVATE_DEAD",\
        "heartbeatResurrectionStrategy": "NO_REVIVE",\
        "heartbeatBasis": "FROM_FIRST_PING",\
        "machineUniquenessStrategy": "UNIQUE_PER_LICENSE",\
        "machineMatchingStrategy": "MATCH_ALL",\
        "componentUniquenessStrategy": "UNIQUE_PER_MACHINE",\
        "componentMatchingStrategy": "MATCH_ALL",\
        "expirationStrategy": "RESTRICT_ACCESS",\
        "expirationBasis": "FROM_CREATION",\
        "renewalBasis": "FROM_EXPIRY",\
        "transferStrategy": "KEEP_EXPIRY",\
        "authenticationStrategy": "TOKEN",\
        "machineLeasingStrategy": "PER_LICENSE",\
        "processLeasingStrategy": "PER_MACHINE",\
        "overageStrategy": "NO_OVERAGE",\
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
            "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/product"\
          },\
          "data": {\
            "type": "products",\
            "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"\
          }\
        },\
        "pool": {\
          "links": {\
            "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/pool"\
          }\
        },\
        "licenses": {\
          "links": {\
            "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/licenses"\
          }\
        },\
        "entitlements": {\
          "links": {\
            "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements"\
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
      "id": "0b4b1a9a-e25a-4f14-a95e-d9dd378d6065",\
      "type": "policies",\
      "links": {\
        "self": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"\
      },\
      "attributes": {\
        "name": "Premium Add-On",\
        "duration": 1209600,\
        "strict": false,\
        "floating": true,\
        "scheme": null,\
        "requireProductScope": false,\
        "requirePolicyScope": false,\
        "requireMachineScope": false,\
        "requireFingerprintScope": false,\
        "requireComponentsScope": false,\
        "requireUserScope": false,\
        "requireChecksumScope": false,\
        "requireVersionScope": false,\
        "requireCheckIn": false,\
        "checkInInterval": null,\
        "checkInIntervalCount": null,\
        "usePool": false,\
        "maxMachines": 5,\
        "maxProcesses": null,\
        "maxUsers": null,\
        "maxCores": null,\
        "maxMemory": null,\
        "maxDisk": null,\
        "maxUses": null,\
        "encrypted": false,\
        "protected": false,\
        "requireHeartbeat": false,\
        "heartbeatDuration": null,\
        "heartbeatCullStrategy": "DEACTIVATE_DEAD",\
        "heartbeatResurrectionStrategy": "NO_REVIVE",\
        "heartbeatBasis": "FROM_FIRST_PING",\
        "machineUniquenessStrategy": "UNIQUE_PER_LICENSE",\
        "machineMatchingStrategy": "MATCH_ALL",\
        "componentUniquenessStrategy": "UNIQUE_PER_MACHINE",\
        "componentMatchingStrategy": "MATCH_ALL",\
        "expirationStrategy": "RESTRICT_ACCESS",\
        "expirationBasis": "FROM_CREATION",\
        "renewalBasis": "FROM_EXPIRY",\
        "transferStrategy": "KEEP_EXPIRY",\
        "authenticationStrategy": "TOKEN",\
        "machineLeasingStrategy": "PER_LICENSE",\
        "processLeasingStrategy": "PER_MACHINE",\
        "overageStrategy": "NO_OVERAGE",\
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
            "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/product"\
          },\
          "data": {\
            "type": "products",\
            "id": "3ab38aae-bbf7-4846-9c32-af9d94bf5ad4"\
          }\
        },\
        "pool": {\
          "links": {\
            "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/pool"\
          }\
        },\
        "licenses": {\
          "links": {\
            "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/licenses"\
          }\
        },\
        "entitlements": {\
          "links": {\
            "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements"\
          }\
        }\
      }\
    },\
    …\
  ]
}content_copy
```

## [_link_](https://keygen.sh/docs/api/policies/\#policies-pool) Pop key from pool

Pop off (delete) a key from the policy's pool of pre-determined keys. The
returned key is only available directly after a pop, similar to
authentication tokens. This cannot be undone.

This action **does not** create a license resource. What you do with the
key after a pop is up to you e.g. create a license with it, discard it,
etc. To pop a key and create a license in a single action, simply [create\\
a license](https://keygen.sh/docs/api/licenses/#licenses-create) that implements the pooled policy.

### [_link_](https://keygen.sh/docs/api/policies/\#policies-pop-pool-permissions) Required permissions

- policy.pool.pop

### [_link_](https://keygen.sh/docs/api/policies/\#policies-pop-pool-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-pop-pool-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-pop-pool-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-pop-pool-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-pop-pool-params-id) <id>

stringrequired



The identifier (UUID) of the policy to be retrieved.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-pop-pool-returns) Returns

A `200 OK` response will be returned along with the popped key object.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/policies/<id>/pool
https://api.keygen.sh/v1/accounts/<account>/policies/<id>/pool
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool", {
  method: "DELETE",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
content_copyimport requests
import json

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.delete(
  "https://api.keygen.sh/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool",
  method: .delete,
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool",
  method: .delete,
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
  "policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);
using RestSharp;

var client = new RestClient("https://api.keygen.sh/v1/accounts/<account>");
var request = new RestRequest(
  "policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool",
  Method.DELETE
);

request.AddHeader("Accept", "application/vnd.api+json");
request.AddHeader("Authorization", "Bearer <token>");

var response = client.Execute(request);

content_copyimport com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool")
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

req.set_request_uri("/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool");
req.set_method(methods::DELETE);

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

req.set_request_uri("/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool");
req.set_method(methods::DELETE);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
content_copy
```

#### Example response / 200 OK

```
{
  "data": {
    "id": "6331bcae-73c1-4a7e-bf02-bbf77cbb81d7",
    "type": "keys",
    "links": {
      "self": "/v1/accounts/<account>/keys/6331bcae-73c1-4a7e-bf02-bbf77cbb81d7"
    },
    "attributes": {
      "key": "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",
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
          "related": "/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool/product"
        },
        "data": {
          "type": "products",
          "id": "1f286fb6-c9bb-498b-a4e7-6c67748b1f4f"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool/policy"
        },
        "data": {
          "type": "policies",
          "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        }
      }
    }
  }
}
{
  "data": {
    "id": "6331bcae-73c1-4a7e-bf02-bbf77cbb81d7",
    "type": "keys",
    "links": {
      "self": "/v1/accounts/<account>/keys/6331bcae-73c1-4a7e-bf02-bbf77cbb81d7"
    },
    "attributes": {
      "key": "C1B6DE-39A6E3-DE1529-8559A0-4AF593-V3",
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
          "related": "/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool/product"
        },
        "data": {
          "type": "products",
          "id": "1f286fb6-c9bb-498b-a4e7-6c67748b1f4f"
        }
      },
      "policy": {
        "links": {
          "related": "/v1/accounts/<account>/policies/a5a154d2-f026-40fa-bc8d-a7e3ca415298/pool/policy"
        },
        "data": {
          "type": "policies",
          "id": "a5a154d2-f026-40fa-bc8d-a7e3ca415298"
        }
      }
    }
  }
}content_copy
```

## [_link_](https://keygen.sh/docs/api/policies/\#policies-relationships) Policy relationships

Relationship endpoints for the policy resource.

### [_link_](https://keygen.sh/docs/api/policies/\#policies-relationships-attach-entitlements) Attach policy entitlements

Attach entitlements to a policy. This will immediately be taken into effect
for all future license validations. Any license that implements the given
policy will automatically possess all the policy's entitlements.

**Below are the limitations to attaching an entitlement:**

- You cannot attach an already attached entitlement.

### [_link_](https://keygen.sh/docs/api/policies/\#policies-attach-entitlements-permissions) Required permissions

- policy.entitlements.attach

### [_link_](https://keygen.sh/docs/api/policies/\#policies-attach-entitlements-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-attach-entitlements-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-attach-entitlements-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-attach-entitlements-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-attach-entitlements-params-id) <id>

stringrequired



The identifier (UUID) of the policy to be updated.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-attach-entitlements-returns) Returns

A `201 Created` response will be returned along with an array of policy entitlement objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/policies/<id>/entitlements
https://api.keygen.sh/v1/accounts/<account>/policies/<id>/entitlements
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements", {
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

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements", {
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
  "https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements",
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
  "https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements",
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
  "policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements",
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
  "policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements",
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

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements")
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

val res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements")
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

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements")
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

HttpResponse<JsonNode> res = Unirest.post("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements")
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

req.set_request_uri("/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements");
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

req.set_request_uri("/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements");
req.set_method(methods::POST);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X POST https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements \
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
curl -X POST https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements \
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
      "type": "policy-entitlements",\
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
        "policy": {\
          "links": {\
            "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"\
          },\
          "data": {\
            "type": "policies",\
            "id": "0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"\
          }\
        }\
      },\
      "links": {\
        "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements/57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    }\
  ]
}
{
  "data": [\
    {\
      "id": "14fb3e6a-2b30-42b4-b2ff-06ca2e6c0608",\
      "type": "policy-entitlements",\
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
        "policy": {\
          "links": {\
            "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"\
          },\
          "data": {\
            "type": "policies",\
            "id": "0b4b1a9a-e25a-4f14-a95e-d9dd378d6065"\
          }\
        }\
      },\
      "links": {\
        "related": "/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements/57f1ceb4-6bf4-44dd-8967-de88364bf9eb"\
      }\
    }\
  ]
}
content_copy
```

### [_link_](https://keygen.sh/docs/api/policies/\#policies-relationships-detach-entitlements) Detach policy entitlements

Detach entitlements from a policy. This will immediately be taken into effect
for all future license validations.

### [_link_](https://keygen.sh/docs/api/policies/\#policies-detach-entitlements-permissions) Required permissions

- policy.entitlements.detach

### [_link_](https://keygen.sh/docs/api/policies/\#policies-detach-entitlements-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-detach-entitlements-auths-bearer) Bearer

required



An authentication token with privileges to manage the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-detach-entitlements-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-detach-entitlements-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-detach-entitlements-params-id) <id>

stringrequired



The identifier (UUID) of the policy to be updated.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-detach-entitlements-returns) Returns

A `204 No Content` response will be returned.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/policies/<id>/entitlements
https://api.keygen.sh/v1/accounts/<account>/policies/<id>/entitlements
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements", {
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

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements", {
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
  "https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements",
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
  "https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements",
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

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements",
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
  "policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements",
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
  "policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements",
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

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements")
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

val res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements")
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

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements")
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

HttpResponse<JsonNode> res = Unirest.delete("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements")
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

req.set_request_uri("/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements");
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

req.set_request_uri("/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements");
req.set_method(methods::DELETE);
req.set_body(body.serialize());

client.request(req)
  .then([](http_response res)
  {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl -X DELETE https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements \
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
curl -X DELETE https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements \
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

### [_link_](https://keygen.sh/docs/api/policies/\#policies-relationships-list-entitlements) List policy entitlements

Returns a list of entitlements attached to the policy. The entitlements are returned
sorted by creation date, with the most recent entitlements appearing first.

### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-entitlements-permissions) Required permissions

- entitlement.read

### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-entitlements-auths) Authentication

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-entitlements-auths-bearer) Bearer

required



An authentication token with privileges to view the resource: either an admin, an environment, or the product it belongs to.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-entitlements-params) URL parameters

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-entitlements-params-account) <account>

stringrequired



The identifier (UUID) or slug of your Keygen account.

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-entitlements-params-id) <id>

stringrequired



The identifier (UUID) of the policy to list entitlements for.


### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-entitlements-query) Query parameters

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-entitlements-query-limit) limit

integerdefault=10



A limit on the number of entitlements to be returned. Limit must be a number between 1 and 100.





```
/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements?limit=25
/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements?limit=25
```

- #### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-entitlements-query-page) page

object<string, integer>



Object containing page `size` and page `number`. Page size must be a number between 1 and 100.





```
/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements?page[size]=15&page[number]=2
/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements?page[size]=15&page[number]=2
```


### [_link_](https://keygen.sh/docs/api/policies/\#policies-list-entitlements-returns) Returns

A `200 OK` response will be returned along with a list of entitlement objects.

Upon error, an [`errors` object](https://keygen.sh/docs/api/errors/) will be returned along with an
HTTP status code indicating the type of error. When an error occurs, the
`data` property will not be included.

#### Definition

```
https://api.keygen.sh/v1/accounts/<account>/policies/<id>/entitlements
https://api.keygen.sh/v1/accounts/<account>/policies/<id>/entitlements
```

#### Example request

```
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements?limit=15", {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
})

const { data, errors } = await response.json()
const fetch = require("node-fetch")

const response = await fetch("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements?limit=15", {
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
  "https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
import requests
import json

res = requests.get(
  "https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements?limit=15",
  headers={
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer <token>"
  }
).json()
content_copyimport SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements?limit=15",
  headers: [\
    "Accept": "application/vnd.api+json",\
    "Authorization": "Bearer <token>"\
  ]
).responseJSON { response in
  let json = JSON(data: response.data!)
}
import SwiftyJSON
import Alamofire

Alamofire.request("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements?limit=15",
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

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
import com.mashape.unirest.http.exceptions.*
import com.mashape.unirest.http.*

val res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson()
content_copyimport com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements")
  .header("Authorization", "Bearer <token>")
  .header("Accept", "application/vnd.api+json")
  .queryString("limit", 15)
  .asJson();
import com.mashape.unirest.http.exceptions.*;
import com.mashape.unirest.http.*;

HttpResponse<JsonNode> res = Unirest.get("https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements")
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

uri_builder uri("/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements");
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

uri_builder uri("/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements");
uri.append_query("limit", 15);

req.set_request_uri(uri.to_uri());
req.set_method(methods::GET);

client.request(req)
  .then([](http_response res) {
    auto data = res.extract_json().get();
  })
  .wait();
content_copycurl https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements?limit=15 -g \
  -H 'Accept: application/vnd.api+json' \
  -H 'Authorization: Bearer <token>'
curl https://api.keygen.sh/v1/accounts/<account>/policies/0b4b1a9a-e25a-4f14-a95e-d9dd378d6065/entitlements?limit=15 -g \
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