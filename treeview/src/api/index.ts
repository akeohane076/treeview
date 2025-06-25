const BASE_URL = "http://localhost:8000";

const api = {
    get: async () => {
        const res = await fetch(BASE_URL)
        return res.json()
    }
}

export default api