# 📦 Firebase Storage

1. Whenever user made a subscription, custom claims added to **Authentication token** to allow access to **Storage** files.

2. Check out `./firebase/serverUserSessionUtils.ts`

```typescript
if (isSubscriber) {
  await getAuth().setCustomUserClaims(authData.uid, { subscriber: true });
}
```

3. **Storage** -> **Rules**: add security rule to grant access to **Storage** with custom claim `subscriber`.

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow write: if false;
      allow read: if request.auth.token.subscriber == true;
    }
  }
}
```

5. Storage files access controlled by custom claims attribute.
