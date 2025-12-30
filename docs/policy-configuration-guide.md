# Policy Configuration Guide

This guide explains how to properly configure policies in Keygen, particularly regarding machine limits and licensing strategies.

## Understanding maxMachines Behavior

The `maxMachines` attribute controls how many machines can be associated with a license, but its behavior depends on several other policy attributes.

### Key Rules

1. **Non-Floating Policies** (default: `floating: false`)
   - `maxMachines` **must be equal to 1**
   - A license can only be used on ONE machine at a time
   - This is the default behavior for single-device licensing

2. **Floating Policies** (`floating: true`)
   - `maxMachines` can be > 1
   - A license can be used across multiple machines
   - When `strict: false`, the limit is not enforced (informational only)
   - When `strict: true`, the limit is strictly enforced

3. **Strict Enforcement** (`strict: true`)
   - Machine limits are actively enforced
   - License validation will fail if limits are exceeded
   - A license must have at least 1 machine to pass validation

### Common Scenarios

#### Scenario 1: Single-Device License (Default)
**Use Case**: Software that should run on only one device per license key.

```json
{
  "floating": false,
  "strict": false,
  "maxMachines": 1
}
```

#### Scenario 2: Multi-Device License (Floating)
**Use Case**: Software that can be installed on multiple devices (e.g., 3 devices per license).

```json
{
  "floating": true,
  "strict": true,
  "maxMachines": 3
}
```

**Important**: Both `floating: true` AND `strict: true` are required to enforce multi-device limits!

#### Scenario 3: Unlimited Devices (Floating, No Limit)
**Use Case**: Enterprise license with unlimited installations.

```json
{
  "floating": true,
  "strict": false,
  "maxMachines": null
}
```

### Machine Uniqueness Strategy

The `machineUniquenessStrategy` determines how machine fingerprints are validated:

- **`UNIQUE_PER_LICENSE`** (default): Same machine can be registered to different licenses
- **`UNIQUE_PER_POLICY`**: Same machine cannot use multiple licenses from the same policy
- **`UNIQUE_PER_PRODUCT`**: Same machine cannot use multiple licenses for the same product
- **`UNIQUE_PER_ACCOUNT`**: Same machine cannot use multiple licenses in the entire account

**Example**: Prevent trial abuse by setting trial policies to `UNIQUE_PER_POLICY`.

## Troubleshooting

### Problem: "I set maxMachines to 3 but can't use the license on multiple machines"

**Solution**: You need to set **both** `floating: true` and `strict: true`:

1. Edit your policy
2. Enable "Floating" option
3. Enable "Strict" option
4. Set maxMachines to 3
5. Save the policy

**Why**: Non-floating policies can only have `maxMachines: 1`. To allow multiple machines, the policy must be floating.

### Problem: "My license works on more machines than maxMachines allows"

**Solution**: Set `strict: true`. Without strict mode, machine limits are informational only.

### Problem: "I want to allow the same person to use the license on their laptop and desktop"

**Solution**: Use a floating policy:
- `floating: true`
- `strict: true`
- `maxMachines: 2`

This allows the license owner to activate the software on both devices.

## Policy Attributes Reference

### Core Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `floating` | boolean | `false` | Allow license to work across multiple machines |
| `strict` | boolean | `false` | Enforce machine limits and require at least 1 machine |
| `maxMachines` | integer | `null` | Maximum machines allowed (must be 1 for non-floating) |
| `machineUniquenessStrategy` | string | `UNIQUE_PER_LICENSE` | How to validate machine fingerprints |
| `machineMatchingStrategy` | string | `MATCH_ANY` | How to match machines during validation |

### License Validation Rules

When `strict: true`:
- License validation fails if machine limits are exceeded
- License must have at least 1 associated machine
- Overage strategy applies to determine validation behavior

When `strict: false`:
- Machine limits are not enforced during validation
- Limits are informational only
- Good for soft enforcement scenarios

## Best Practices

1. **Start with defaults**: Use `floating: false` and `maxMachines: 1` for standard single-device licenses
2. **Use strict mode**: Enable `strict: true` when you need hard limits enforced
3. **Document your policies**: Add metadata to describe the policy's purpose
4. **Test thoroughly**: Create test licenses and verify machine activation behavior
5. **Consider user experience**: Allow reasonable machine limits for legitimate use cases

## API Reference

For complete API documentation, see:
- [Keygen Policy API Documentation](https://keygen.sh/docs/api/policies/)
- [Machine Management](https://keygen.sh/docs/api/machines/)
- [License Validation](https://keygen.sh/docs/api/licenses/#licenses-actions-validate)

## Additional Resources

- `keygen-api/policies.md` - Full policy API documentation
- `keygen-api/machines.md` - Machine management documentation
- `keygen-api/licenses.md` - License management documentation
