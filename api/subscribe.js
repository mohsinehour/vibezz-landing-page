export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end()

    const { email } = JSON.parse(req.body)

    const response = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            listIds: [Number(process.env.BREVO_LIST_ID)],
            updateEnabled: true, // won't error if email already exists
        }),
    })

    if (response.status === 201 || response.status === 204) {
        return res.status(200).json({ success: true })
    }

    const error = await response.json()
    return res.status(400).json({ error: error.message })
}