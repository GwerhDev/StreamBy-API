const router = require("express").Router();
const { decodeToken } = require("../../integrations/jwt");
const credentialSchema = require("../../models/Credential");
const { message } = require("../../messages");
const { getSignedUrl, deleteFileByUrl } = require("../../integrations/aws");

router.post("/create-signed-url", async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ message: message.file.body.notfound });

    const {
      mimetype,
      clientId,
      clientSecret,
    } = req.body;

    if (!mimetype) return res.status(400).json({ message: message.file.format.invalid });

    const decodedClientSecret = await decodeToken(clientSecret);
    const decodedClientId = decodedClientSecret.clientId;

    if (clientId !== decodedClientId) return res.status(403).json({ message: message.permission.denied });

    const validatedCredential = await credentialSchema.findById(clientId);
    if (!validatedCredential) return res.status(403).json({ message: message.permission.denied });

    if (validatedCredential.active) {
      const response = await getSignedUrl({
        clientId,
        mimetype: mimetype,
        ex: mimetype.split("/")[1],
      });

      return res.status(200).send(response);
    };

    return res.status(404).send({ message: message.permission.denied });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/delete-by-url", async (req, res) => {
  try {
    if (!req.body) return res.status(400).json({ message: message.file.url.notfound });

    const {
      fileUrl,
      clientId,
      clientSecret,
    } = req.body;

    if (!fileUrl) return res.status(400).json({ message: message.file.format.invalid });

    const decodedClientSecret = await decodeToken(clientSecret);
    const decodedClientId = decodedClientSecret.clientId;

    if (clientId !== decodedClientId) return res.status(403).json({ message: message.permission.denied });

    const validatedCredential = await credentialSchema.findById(clientId);
    if (!validatedCredential) return res.status(403).json({ message: message.permission.denied });

    if (validatedCredential.active) {
      const response = await deleteFileByUrl(fileUrl);

      return res.status(200).send(response);
    }
    
    return res.status(404).send({ message: message.permission.denied });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;