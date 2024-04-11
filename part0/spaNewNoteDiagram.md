sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: JSON Response: note created
    deactivate server

    Note right of browser: The browser receives a 201 status code indicating that the POST was successful