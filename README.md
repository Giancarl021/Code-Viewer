# Code-Viewer

CLI tool to view code from a local folder through a webserver.

## Installation

```bash
npm install --global @giancarl021/code-viewer
```

## Usage

The application have a single command: `serve`, which starts the webserver and routes the local files to the browser.

The description of this command is the following:

```plaintext
code-viewer serve [<path/to/expose>]
  Description: Exposes a path on the given port, default path is current working directory       
  Flags:
    -p | --port: The port to serve the application on, default PORT environment variable or 3000 
      Values: <port>
    -t | --tunnel: Create a tunnel to the internet with the localtunnel service
```

Supposing you want to expose the `src` directory in the current working directory on port 8080, you can run the following command:

```bash
code-viewer serve src --port 8080
```