/**
 * Class for making various requests to submissions API.
 */
export default class SubmissionsAPI {
    private readonly baseUri = '/api/submissions';

    /**
     * Submits data to the server.
     * @param submission Submission data of arbitrary structure.
     */
    public async saveSubmission(submission: any) {
        const options: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submission),
        };
        return await fetch(this.baseUri, options)
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(await response.json());
            })
            .catch((error) => console.error('Unable to submit form data.', error));
    }

    /**
     * Retrieves submissions from the server according to the specified criteria.
     * @param filterObject A filter object that describes the search criteria. Must contain fields named "fieldName"
     * and "searchValue".
     */
    public async findSubmissions(filterObject: any) {
        const options: RequestInit = {
            method: 'GET',
        };
        const jsonFilter = JSON.stringify(filterObject);
        return await fetch(`${this.baseUri}?jsonFilter=${jsonFilter}`, options)
            .then(async (response) => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(await response.json());
            })
            .catch((error) => console.error('Unable to fetch data from server.', error));
    }
}
