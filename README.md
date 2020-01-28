# xomcho

> An eCommercial tool for online shops and more

## Compatibility

- Node v10.18.1
- Nuxt v2.11.0

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Plugin Setup

### Buefy
- Install as [commit](https://github.com/pdthang/octomaker-blog/commit/81030cb4f8779d8d84a6f3f5566c0c71c6d2f70b) 

### Firebase

#### Get started

- Go to [Firebase Console](https://console.firebase.google.com/) -> Add project
- Add an app to get started (Choose Web)
- Get `project config` in Project Setting / Your apps / Firebase SDK snippet / Config

#### Authentication

- Sign-in method
  - Email/Password
- Authorized domains
  - Add domain (octomaker.com)
    - https://kipalog.com/posts/Set-custom-domain-free-cho-Firebase-hosting
    - https://medium.com/google-cloud/google-firebase-hosting-custom-domain-the-missing-manual-7f971c3c2d1e
- Templates
  - Email address verification

    ```
    Sender name
    not provided

    From
    noreply@xomcho.net

    Reply to
    not provided

    Subject
    [XomCho.net] Xác Minh Email

    Message
    Xin chào %DISPLAY_NAME%!

    Truy cập liên kết này để xác minh địa chỉ email của bạn.

    https://www.xomcho.net/user/activekey?mode=<action>&oobCode=<code>

    Nếu bạn không yêu cầu xác minh địa chỉ email này, bạn có thể bỏ qua email này.

    Cảm ơn bạn!

    Nhóm XomCho.net
    ```

  - Password reset

    ```
    Sender name
    not provided

    From
    noreply@xomcho.net

    Reply to
    not provided

    Subject
    [XomCho.net] Đặt Lại Mật Khẩu

    Message
    Xin chào!

    Truy cập liên kết để đặt lại mật khẩu cho tài khoản %EMAIL% .

    https://www.xomcho.net/user/activekey?mode=<action>&oobCode=<code>

    Nếu bạn không yêu cầu đặt lại mật khẩu, bạn có thể bỏ qua email này.

    Cảm ơn bạn!

    Nhóm XomCho.net
    ```

  - Email address change

    ```
    Sender name
    not provided

    From
    noreply@xomcho.net

    Reply to
    not provided

    Subject
    [XomCho.net] Khôi Phục Email

    Message
    Xin chào %DISPLAY_NAME%!

    Email đăng nhập của bạn cho XomCho.net đã thay đổi %NEW_EMAIL%.

    Nếu bạn không yêu cầu thay đổi email, hãy truy cập liên kết này để đặt lại email đăng nhập của bạn.

    https://www.xomcho.net/user/activekey?mode=<action>&oobCode=<code>

    Cảm ơn bạn!

    Nhóm XomCho.net
    ```

  - SMS verification

    ```
    Message
    %LOGIN_CODE% là mã xác minh của bạn cho %APP_NAME%.
    ```
#### Realtime Database

- Rules

  ```json
  {
    "rules": {
      ".read": "true",
      ".write": "auth != false",
      "items": {
          ".indexOn": ["id", "title", "updatedDate", "_shop/id", "_creator/id", "category"]
      },
      "shops": {
          ".indexOn": ["id", "title", "updatedDate", "_creator/id", "category"]
      },
      "users": {
          ".indexOn": ["email"]
      },
      "chats": {
        "$groupid": {
            ".indexOn": ["updatedDate", "state"]
        }
      }
    }
  }
  ```

#### Storage

- Rules
  
  ```json
  service firebase.storage {
      match /b/{bucket}/o {
          match /{allPaths=**} {
              allow read, write: if request.auth != null;
          }
      }
  }
  ```

## TODO

- Re-check try/catch
- Re-check scss