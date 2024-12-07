export const emailTemplate = (
  title: string,
  description: string,
  unsubscribeLink: string
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Blog Post</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #007bff; color: white; text-align: center; padding: 15px; }
        .content { margin: 20px 0; }
        .post-title { color: #007bff; }
        .unsubscribe { text-align: center; font-size: 12px; color: #888; }
    </style>
</head>
<body>
    <div class="header">
        <h1>New Blog Post</h1>
    </div>
    <div class="content">
        <h2>Artikel Baru Telah Dipublikasikan</h2>
        <br/>
        <br/>
        <h3 class="post-title">${title}</h3>
        <p>${description}</p>
    </div>
    <div class="unsubscribe">
        <p>You're receiving this email because you're subscribed to our updates.</p>
        <a href="${unsubscribeLink}">Unsubscribe</a>
    </div>
</body>
</html>
`;
