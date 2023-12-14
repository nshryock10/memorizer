
export const API_ENDPOINT = 'http://localhost:4000';

export const getQueues = async () => {
    const response = await fetch (`${API_ENDPOINT}/queues`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const queues = await response.json();

    return queues;
}