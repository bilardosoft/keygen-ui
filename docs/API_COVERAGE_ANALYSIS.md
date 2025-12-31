# API Coverage Analysis

This document compares the Keygen API documentation (in `keygen-api/*.md`) with the current implementation in the application.

**Last Updated:** December 31, 2025 - Added new API documentation files (request-logs, event-logs, pagination, offline-licensing)

## Summary

### ✅ Fully Implemented Resources
- **Users** - All CRUD operations + actions (ban, unban, password management, tokens)
- **Groups** - All CRUD operations + relationships (licenses, users)
- **Environments** - All CRUD operations
- **Components** - All CRUD operations

### ⚠️ Partially Implemented Resources

#### **Licenses**
**Missing API Actions:**
- `validate` - Validate a license
- `validate-key` - Validate a license by key
- `validate-codes` - Validate with validation codes
- `validate-key-codes` - Validate by key with codes
- `revoke` - Revoke a license
- `check-out` - Check out a license
- `check-in` - Check in a license
- `increment-usage` - Increment usage counter

**Implemented:**
- ✅ CRUD operations (list, get, create, update, delete)
- ✅ suspend, reinstate, renew
- ✅ decrementUsage, resetUsage
- ✅ User relationships (attach, detach)
- ✅ Entitlement relationships (attach, detach, list)
- ✅ Machine relationships (list)
- ✅ Owner/group/policy changes
- ✅ Generate activation token

#### **Machines**
**Fully implemented** - All documented actions present:
- ✅ CRUD operations (list, get, create/activate, update, delete/deactivate)
- ✅ check-out
- ✅ ping (heartbeat)
- ✅ reset (heartbeat)
- ✅ Relationships (processes, components, owner, group)

#### **Policies**
**Missing API Actions:**
- `pop` - Pop a license key from the pool

**Implemented:**
- ✅ CRUD operations (list, get, create, update, delete)
- ✅ Entitlement relationships (attach, detach, list)

#### **Products**
**Fully implemented:**
- ✅ CRUD operations (list, get, create, update, delete)
- ✅ generateToken

#### **Processes**
**Fully implemented:**
- ✅ CRUD operations (list, get, create, update, delete)
- ✅ ping action

### 📋 New API Documentation Added (December 31, 2025)

The following API documentation files have been added to `keygen-api/`:

1. **request-logs.md** ✅ - Has implementation
   - Documents Request Logs API (Beta)
   - Implementation: `src/lib/api/resources/request-logs.ts`
   - Status: **Documented** (basic list operation implemented)

2. **event-logs.md** ❌ - Missing implementation
   - Documents Event Logs API (Beta)
   - Endpoints: list, get (retrieve)
   - Status: **Needs Implementation**

3. **pagination.md** ℹ️ - General documentation
   - Documents pagination patterns for API responses
   - Not a resource, but API usage guidance
   - Status: **Reference documentation only**

4. **offline-licensesing.md** ℹ️ - General documentation
   - Documents offline licensing and cryptographic operations
   - Covers cryptographic license files and keys
   - Status: **Reference documentation only**
   - Note: Filename has typo ("licensesing" should be "licensing")

### 📋 Resources with Implementation but Previously Lacking Documentation

These resources had implementation but now have documentation (or still need it):

1. **Entitlements** (`src/lib/api/resources/entitlements.ts`)
   - Full CRUD implementation
   - License relationships
   - Status: Still needs `keygen-api/entitlements.md`

2. **Request Logs** (`src/lib/api/resources/request-logs.ts`) ✅
   - Basic list operation
   - **Now has** `keygen-api/request-logs.md` ✅

3. **Webhooks** (`src/lib/api/resources/webhooks.ts`)
   - Need to review implementation
   - Still needs `keygen-api/webhooks.md`

## Detailed Breakdown

### Licenses - Missing Actions

The following license actions are documented in the API but not implemented:

1. **validate** (`POST /licenses/:id/actions/validate`)
   - Validates a license and returns validation result
   - Used to check if license is valid for use

2. **validate-key** (`POST /licenses/actions/validate-key`)
   - Validates a license by its key (not ID)
   - Returns license data and validation result

3. **validate-codes** (`POST /licenses/:id/actions/validate-codes`)
   - Validates with specific validation/entitlement codes
   - More granular than basic validate

4. **validate-key-codes** (`POST /licenses/actions/validate-key-codes`)
   - Validates by key with specific validation codes
   - Combines validate-key and validate-codes

5. **revoke** (`POST /licenses/:id/actions/revoke`)
   - Revokes a license permanently
   - Different from suspend (which is reversible)

6. **check-out** (`POST /licenses/:id/actions/check-out`)
   - Checks out a license for offline use
   - Generates a checkout token

7. **check-in** (`POST /licenses/:id/actions/check-in`)
   - Checks in a previously checked-out license

8. **increment-usage** (`POST /licenses/:id/actions/increment-usage`)
   - Increments the usage counter
   - Counterpart to decrementUsage (which is implemented)

### Policies - Missing Actions

1. **pop** (`POST /policies/:id/actions/pop`)
   - Pops a license key from the policy's key pool
   - Only applies to policies with `usePool: true`

### Event Logs - Missing Implementation

**New API Documentation Added:** `keygen-api/event-logs.md`

Event Logs API (Beta) is documented but not yet implemented:

1. **list** (`GET /event-logs`)
   - List all event logs for auditing and debugging
   - Supports filtering and pagination

2. **get** (`GET /event-logs/:id`)
   - Retrieve a specific event log by ID

**Recommended Implementation:**
- Create `src/lib/api/resources/event-logs.ts`
- Implement list and get methods
- Consider creating UI component for event logs viewing
- Useful for admin dashboard and debugging

## Recommendations

### Priority 1: High-Impact Missing Features

1. **License Validation Actions**
   - Implement `validate`, `validate-key`, `validate-codes`, `validate-key-codes`
   - These are critical for license verification in client applications
   - Should be added to `src/lib/api/resources/licenses.ts`
   - Reference: `keygen-api/offline-licensesing.md` for offline scenarios

2. **License Check-out/Check-in**
   - Implement `check-out` and `check-in` actions
   - Critical for offline licensing scenarios
   - Should be added to `src/lib/api/resources/licenses.ts`
   - Reference: `keygen-api/offline-licensesing.md`

### Priority 2: Complete Feature Sets

3. **Event Logs Resource** 🆕
   - Implement `src/lib/api/resources/event-logs.ts`
   - Add list and get methods
   - Consider UI component for admin dashboard
   - Documentation: `keygen-api/event-logs.md`

4. **License Revoke**
   - Implement `revoke` action
   - Complements suspend/reinstate functionality

5. **License Increment Usage**
   - Implement `increment-usage` action
   - Complements the existing decrementUsage method

6. **Policy Pool Pop**
   - Implement `pop` action for pool-based policies
   - Needed for pre-generated key pools

### Priority 3: Documentation

7. **Create Missing API Docs**
   - Add `keygen-api/entitlements.md` (implementation exists)
   - Add `keygen-api/webhooks.md` (implementation exists)

### New Reference Documentation Added ✅

- ✅ `keygen-api/pagination.md` - Pagination patterns and usage
- ✅ `keygen-api/offline-licensesing.md` - Offline licensing guide
- ✅ `keygen-api/request-logs.md` - Request logs API (has implementation)

## Implementation Status by Resource

| Resource | CRUD | Actions | Relationships | Documentation |
|----------|------|---------|---------------|---------------|
| Users | ✅ | ✅ Full | ✅ | ✅ |
| Groups | ✅ | N/A | ✅ | ✅ |
| Licenses | ✅ | ⚠️ Partial | ✅ | ✅ |
| Machines | ✅ | ✅ Full | ✅ | ✅ |
| Policies | ✅ | ⚠️ Partial | ✅ | ✅ |
| Products | ✅ | ✅ Full | N/A | ✅ |
| Environments | ✅ | N/A | N/A | ✅ |
| Processes | ✅ | ✅ Full | N/A | ✅ |
| Components | ✅ | N/A | N/A | ✅ |
| Entitlements | ✅ | N/A | ✅ | ❌ |
| Request Logs | ⚠️ Partial | N/A | N/A | ✅ 🆕 |
| Event Logs | ❌ | N/A | N/A | ✅ 🆕 |
| Webhooks | ⚠️ Partial | N/A | N/A | ❌ |

### Reference Documentation (Non-Resource)

| Topic | Documentation |
|-------|---------------|
| Pagination | ✅ 🆕 |
| Offline Licensing | ✅ 🆕 |

## Notes

- **CRUD** = Create, Read, Update, Delete operations
- **Actions** = Special API actions beyond CRUD (validate, suspend, etc.)
- **Relationships** = Managing relationships between resources (included in Groups implementation)
- **⚠️ Partial** = Some features missing (see details above)
- **✅ Full** = Fully implemented
- **❌** = Not implemented or documented
- **N/A** = Not applicable (API doesn't have this for the resource)
- **🆕** = Newly added documentation (December 31, 2025)
