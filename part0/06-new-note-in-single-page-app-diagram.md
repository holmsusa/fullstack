# 0.6 New note in SPA-diagram
The spa.js that was retrieved from the server contains JavaScript code for handling the new notes. When the user clicks 'Save', the code prevents the default form behaviour and instead creates a new element to the note-list, and sends the new note to the server, with a header telling it is in .json format. The server receives it and replies with HTTP status 201, which does not cause the browser to start reloading the page. 


```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: writing new note
    user->>browser: Click 'Save'

    activate browser
    browser->>browser: spa.js: Preventing default form behaviour (sending to server). 
    
    browser->>browser: spa.js: Parsing new note and adding to list.

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa in .json format
    deactivate browser
    activate server

    Note over server: Server receives the new note and a header telling it is in .json format.

    server-->>browser: HTTP status code 201
    deactivate server

    Note over browser: 201 means 'created', and there is no request to rebase.
    
```