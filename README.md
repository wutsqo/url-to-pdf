# URL to PDF file

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Build the project

```bash
npm run build
```

3. Migrate the database

```bash
npm run migrate
```

4. Run the project

```bash
npm start
```

## API Reference

### GET /generate-pdf?url={url}

Generate a PDF file from a given URL

#### Parameters

- `url` - URL of the page to generate PDF from

### GET /pdf/:id

Get a PDF file by ID

#### Parameters

- `id` - ID of the PDF file

### GET /pdf/:id/download

Download a PDF file by ID

#### Parameters

- `id` - ID of the PDF file

## License

This project is licensed under the MIT License.
