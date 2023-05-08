import { addBookImage } from "../../../../db/dbOperations";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises"

export const config = {
  api: {
    bodyParser: false,
  },
}

const addBooksImage = async (req, res) => {
  if (req.method == "POST") {
    try {
      const form = new formidable.IncomingForm();

      try {
        await fs.readdir(path.join(process.cwd() + "/public/bookImages"));
      }
      catch (err) {
        await fs.mkdir(path.join(process.cwd() + "/public/bookImages"));
      }

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error(err);
          return res.status(500).end();
        }

        const imageFile = files.Image;
        const bookId = fields.BookId;
        console.log('fields.BookId', fields.BookId)
        console.log('imageFile', imageFile)
        const imageContent = await fs.readFile(imageFile.filepath);
        console.log('imageFile', imageFile);
        // Write the image to the public directory

        const publicDir = path.join(process.cwd(), 'public/bookImages');

        const imagePath = path.join(publicDir, imageFile.originalFilename);
        await fs.writeFile(imagePath, imageContent);

        console.log('bookId ', bookId);
        const dbImagePath = `/bookImages/${imageFile.originalFilename}`
        const data = await addBookImage(dbImagePath, bookId);

        return res.status(200).end();
      });


    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
};
export default addBooksImage;