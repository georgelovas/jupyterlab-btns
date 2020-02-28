# @georgelovsa/btns

Add 'Cells Up', 'Cells Down', 'Run all' and 'Restart kernel and Run All' buttons into the toolbar


## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install @georgelovas/btns
```

## Development

For a development install (requires npm version 4 or later), do the following in the repository directory:

```bash
npm install
npm run build
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
npm run build
jupyter lab build
```

