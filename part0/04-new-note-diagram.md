```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: writing new note
    user->>browser: Click 'Save'

    activate browser
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    deactivate browser

    activate server
    server-->>browser: HTTP status code 302
    deactivate server

    Note over browser: The HTTP status code 302 is a URL-redirect which causes the browser to reload the page notes. 

    Note over browser: The notes page is reloaded as already shown before in the diagram.
    
    activate browser
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate browser
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... {"new note"}]
    deactivate server

    Note over browser: The data.json now contains also the new note, which is now displayed in the browser.
```
