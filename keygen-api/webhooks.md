_menu_

[Keygen](https://keygen.sh/)

##### Introduction

- [Getting Started](https://keygen.sh/docs/getting-started/)

##### Guides

- [Choosing a Licensing Model](https://keygen.sh/docs/choosing-a-licensing-model/)
  - [Perpetual Licenses](https://keygen.sh/docs/choosing-a-licensing-model/perpetual-licenses/)
  - [Timed Licenses](https://keygen.sh/docs/choosing-a-licensing-model/timed-licenses/)
  - [Floating Licenses](https://keygen.sh/docs/choosing-a-licensing-model/floating-licenses/)
  - [Node-locked Licenses](https://keygen.sh/docs/choosing-a-licensing-model/node-locked-licenses/)
  - [User-locked Licenses](https://keygen.sh/docs/choosing-a-licensing-model/user-locked-licenses/)
  - [Feature Licenses](https://keygen.sh/docs/choosing-a-licensing-model/feature-licenses/)
  - [Metered Licenses](https://keygen.sh/docs/choosing-a-licensing-model/metered-licenses/)
  - [Offline Licenses](https://keygen.sh/docs/choosing-a-licensing-model/offline-licenses/)
- [Validating License Keys](https://keygen.sh/docs/validating-licenses/)
- [Activating Devices](https://keygen.sh/docs/activating-machines/)
- [Storing Metadata](https://keygen.sh/docs/storing-metadata/)
- [Using Webhooks](https://keygen.sh/docs/using-webhooks/)
- [Custom Domains](https://keygen.sh/docs/custom-domains/)
- [SAML/SSO](https://keygen.sh/docs/sso/)
- [Static IPs](https://keygen.sh/docs/static-ips/)
- [Self Hosting](https://keygen.sh/docs/self-hosting/)
- [Keygen Relay](https://keygen.sh/docs/relay/)
- [Keygen CLI](https://keygen.sh/docs/cli/)
- [Searching](https://keygen.sh/docs/search/)
- [Zapier](https://keygen.sh/docs/zapier/)

##### Distribution

- [Distribute binary apps](https://keygen.sh/docs/api/engines/#engines-raw)
- [Private Docker registry](https://keygen.sh/docs/api/engines/#engines-oci)
- [Private npm packages](https://keygen.sh/docs/api/engines/#engines-npm)
- [Private Ruby gems](https://keygen.sh/docs/api/engines/#engines-rubygems)
- [Private PyPI packages](https://keygen.sh/docs/api/engines/#engines-pypi)
- [Electron apps](https://keygen.sh/docs/api/engines/#engines-electron)
- [Tauri apps](https://keygen.sh/docs/api/engines/#engines-tauri)

##### Integrate

- [Automation with Zapier](https://keygen.sh/integrate/zapier/)
- [Integrate with Electron](https://keygen.sh/integrate/electron/)
- [Use Stripe for Payments](https://keygen.sh/integrate/stripe/)

##### Documentation

- [AI context: `llms.txt`New](https://keygen.sh/llms.txt)
- [Example apps on GitHub _launch_](https://github.com/keygen-sh)
- [API Reference](https://keygen.sh/docs/api/)

##### Community

- [Source code on GitHub _launch_](https://github.com/keygen-sh/keygen-api)
- [Join the community _launch_](https://github.com/keygen-sh/community/discussions)
- [Join the Discord _launch_](https://discord.gg/TRrhSaWSsN)

##### Account

- [Dashboard](https://app.keygen.sh/)

# Using Webhooks

Use webhooks to be notified about events that happen within your Keygen
account. If you need help after reading this, can reach out to us anytime
at [support@keygen.sh](mailto:support@keygen.sh).

## Webhook terminology

1. **Webhook events** are certain events that happen within the context
of your Keygen account, such as a user being created, a successful
license validation, or your account being updated.
2. **Webhook endpoints** are resources defined within your account to which
Keygen sends event data to. A single webhook event may be sent to many
webhook endpoints.
3. **Webhooks** refers to the overall concept of sending webhook event data to
an account's webhook endpoints.

## About webhooks

Certain events that happen within Keygen's systems may not be immediately available when
making an API request e.g., when a license expires at a fixed date and time. A naive solution
for checking if a license has expired would be to poll Keygen's API every `n` minutes so that
you can act upon that expiration at the time it occurs, e.g. to send an email to the
license owner, or to update your own database records.

Let's assume `n = 5 minutes` — that's 1 request every 5 minutes, per license, to poll
license expirations. This obviously wouldn't scale well with hundreds or thousands of
licenses. It would cause strain on both your systems as well as Keygen's systems with
the amount of requests polling each license would require.

Webhooks solve this problem by letting you register a [Webhook Endpoint](https://keygen.sh/docs/api/webhooks/#webhook-endpoints-object) URL that Keygen
will notify anytime an event happens within the context of your Keygen account. When an event
occurs e.g., when a new license is created by a user, Keygen creates a [Webhook Event](https://keygen.sh/docs/api/webhooks/#webhook-events-object)
resource. This resource contains all the relevant information about what just happened
at the time it happened, including the type of event and a snapshot of the data
associated with that event.

Keygen then sends the Webhook Event resource to any Webhook Endpoints defined within
your account via an `HTTP POST` request so that you can immediately act upon the event,
allowing the potential for business automation. You can find [a full list of webhook\\
event types in the API docs](https://keygen.sh/docs/api/webhooks/#webhooks-event-types).

## When to use webhooks

The result of most Keygen requests (e.g., creating users or licenses) are reported synchronously
to your code and don't **require** webhooks for further action. However, depending on your
business requirements, you may want to perform additional actions behind-the-scenes, e.g.
after a user is created, you may want to also create a new [Stripe](https://stripe.com/)
customer, [storing the `stripeAccountId` in the user's metadata attribute](https://keygen.sh/docs/storing-metadata/).

Automating communication between Keygen and your payment provider (e.g. Stripe) is the
most common use-case for using webhooks, allowing you to respond to events on both sides.
For example, when a license is created by one of your users within Keygen, you can charge
their Stripe customer profile for that new license; or when a payment fails within Stripe,
you can suspend their license within Keygen until the payment is successfully processed.

You might also use webhooks to:

- Pipe events, such as `license.validation`, into an analytics provider such as [Amplitude](https://amplitude.com/),
or [Segment](https://segment.com/) for tracking historical usage.
- Email a license key to a customer after a successful purchase.
- Update or create new records in your own database when a specific event occurs (when for example,
you manage your users within your own database instead of within Keygen).
- Email a user when a license expires (or better yet, before it expires via `license.expiring-soon`!)
- Automatically renew licenses before expiration using additional information from your payment.
provider (e.g. you may check if their subscription is still active before renewing).
- Create an audit trail for events of importance for each user or license.

**Webhook endpoints may occasionally receive the same event more than once.** We advise you
to guard against duplicated event receipts by making your event processing [idempotent](https://en.wikipedia.org/wiki/Idempotence).
One way of doing this is by logging the event token you've processed, for example, into Redis,
and then not processing already-logged events. Keygen sends an [idempotency token](https://keygen.sh/docs/api/idempotency/)
with each webhook event which can be used for logging event occurrences to a database.

### Server-side integration

If you're using Keygen server-side, some of the above mentioned steps could potentially
be done within a single transaction, but you may not want to introduce additional network
latency to your user creation process via performing requests to Keygen as well as to
your payment provider.

Instead, you could listen for the `user.created` webhook event that Keygen will send and handle
things with your payment provider asynchronously.

### Client-side integration

If you're using Keygen client-side (i.e. allowing resource creation directly within your product),
handling webhook events might be a must-have, seeing as you may not be able to also create and
manage resources with your payment provider client-side, as you would be exposing your secret keys
within your code.

Instead, you can perform license and machine creation requests client-side [while authenticated\\
as the currently logged in user](https://keygen.sh/docs/api/tokens/#tokens-generate) and listen for the
corresponding webhook events to act accordingly e.g., charging them for new licenses,
crediting them for deleted licenses or machines, etc.

## Configuring a webhook endpoint

Webhooks can be configured within the webhook endpoints resource section of your [account dashboard](https://app.keygen.sh/webhook-endpoints).
Clicking **New Endpoint** will reveal a form to add a new URL for receiving webhooks.

You can enter any URL you'd like to have events sent to, but this should be a dedicated route or
page on your server, coded per the instructions below. **For security reasons, the webhook URL**
**must use the HTTPS protocol.**

## Receiving webhook events

Creating a webhook handler on your server is no different from creating any other route or page
on your website. With PHP, you might create a new `.php` file on your server; with Node and a
framework like Express, you would add a new route with the desired endpoint URL.

Webhook data is sent as JSON in the `POST` request body. The full event details are included and
can be used directly, when required. Each event contains a `payload` attribute, which contains
the subject data at the time of the event.

For added security, you should **NOT** blindly trust the data sent to your webhook endpoint.
To verify a request came from Keygen, see [signature verification](https://keygen.sh/docs/api/signatures/).

**When delivering webhook events to your endpoint, an event is considered**
**failed if the endpoint responds with a non-`2xx` status code.** It will
automatically be retried with an exponential backoff. We will perform
15 retries over approximately 3 days or until your server responds
with a `2xx` status.

#### Example webhook handler using Node and Express

To see a full working example of webhook integration, check out our examples on our GitHub:

- [https://github.com/keygen-sh/example-password-reset-fulfillment](https://github.com/keygen-sh/example-password-reset-fulfillment)
- [https://github.com/keygen-sh/example-webhook-handler](https://github.com/keygen-sh/example-webhook-handler)
- [https://github.com/keygen-sh/example-stripe-integration](https://github.com/keygen-sh/example-stripe-integration)
- [https://github.com/keygen-sh/example-paddle-integration](https://github.com/keygen-sh/example-paddle-integration)

```javascript
const bodyParser = require("body-parser")
const express = require("express")
const app = express()

app.use(bodyParser.json({ type: "application/vnd.api+json" }))
app.use(bodyParser.json({ type: "application/json" }))

app.post("/my/webhook/url", async (req, res) => {
  const { data } = req.body
  if (!data) {
    return res.sendStatus(400)
  }

  // TODO: Verify webhook's signature (https://keygen.sh/docs/api/signatures/)

  switch (data.attributes.event) {
    case "user.created": {
      const user = JSON.parse(data.attributes.payload)

      // … do something when a user is created e.g. create a Stripe customer

      break
    }
    case "license.created": {
      const license = JSON.parse(data.attributes.payload)

      // … do something when a license is created e.g. charge the licensee

      break
    }
    case "license.expiring-soon": {
      const license = JSON.parse(data.attributes.payload)

      // … do something when a license is expiring soon e.g. email the licensee

      break
    }
    case "license.expired": {
      const license = JSON.parse(data.attributes.payload)

      // … do something when a license is expired e.g. cancel their subscription

      break
    }
  }

  // Let Keygen know the event was received successfully
  res.sendStatus(200)
})

const server = app.listen(8080, 'localhost', () => {
  const { address, port } = server.address()

  console.log(`Listening at http://${address}:${port}`)
})
const bodyParser = require("body-parser")
const express = require("express")
const app = express()

app.use(bodyParser.json({ type: "application/vnd.api+json" }))
app.use(bodyParser.json({ type: "application/json" }))

app.post("/my/webhook/url", async (req, res) => {
  const { data } = req.body
  if (!data) {
    return res.sendStatus(400)
  }

  // TODO: Verify webhook's signature (https://keygen.sh/docs/api/signatures/)

  switch (data.attributes.event) {
    case "user.created": {
      const user = JSON.parse(data.attributes.payload)

      // … do something when a user is created e.g. create a Stripe customer

      break
    }
    case "license.created": {
      const license = JSON.parse(data.attributes.payload)

      // … do something when a license is created e.g. charge the licensee

      break
    }
    case "license.expiring-soon": {
      const license = JSON.parse(data.attributes.payload)

      // … do something when a license is expiring soon e.g. email the licensee

      break
    }
    case "license.expired": {
      const license = JSON.parse(data.attributes.payload)

      // … do something when a license is expired e.g. cancel their subscription

      break
    }
  }

  // Let Keygen know the event was received successfully
  res.sendStatus(200)
})

const server = app.listen(8080, 'localhost', () => {
  const { address, port } = server.address()

  console.log(`Listening at http://${address}:${port}`)
})
content_copy
```

**Tip:** A great way to test your webhook integration locally is to use
[`ngrok`](https://ngrok.com/), which allows you to create secure tunnels
to `localhost`, HTTPS and all. Assuming you're running on port `8080`,
you can use the command: `ngrok http -host-header=localhost 8080`.

## Next steps

Congrats! You've learned what webhooks are, when and how to use them, and how
to receive events with your own server. If you have any questions about what
you've learned today, [be sure to reach out](mailto:support@keygen.sh)!

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