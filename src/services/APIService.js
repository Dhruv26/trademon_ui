class APIService {
    constructor() {
        this.url = "http://18.191.150.98:5000";
    }

    async getParameterTypeOptions() {
        try {
            const response = await fetch(`${this.url}/get_entry_meta_data`);
            if (!response.ok) {
                throw Error(response.statusText);
            }

            const data = await response.json();
            return data.Data;
        }
        catch (error) {
            console.log('Unexpected error occured while fetching: ' + error);
            const FALLBACK_INDICATOR_OPTIONS = ["Add some types"];
            return FALLBACK_INDICATOR_OPTIONS;
        }
    }

    async createStockEntry(formData) {
        try {
            const postRequest = await fetch(`${this.url}/add`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!postRequest.ok) {
                throw Error(postRequest.statusText);
            }

            const postMessage = await postRequest.json();
            return {
                success: true,
                message: postMessage
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }

    async deleteStockEntry(id) {
        return await fetch(`${this.url}/delete/${id}`);
    }

    async updateStockEntry(formData) {
        try {
            const postRequest = await fetch(`${this.url}/update`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!postRequest.ok) {
                throw Error(postRequest.statusText);
            }

            const postMessage = await postRequest.json();
            return {
                success: true,
                message: postMessage
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }

    async getHomeTableData() {
        try {
            const tableDataResponse = await fetch(`${this.url}/get_table`);
            if (!tableDataResponse.ok) {
                throw Error(tableDataResponse.statusText);
            }

            const tableData = await tableDataResponse.json();
            return tableData;
        } catch (error) {
            return {
                Data: [],
            };
        }
    }

    async getStockDetails(id) {
        try {
            const stockDataRequest = await fetch(`${this.url}/get_stock_info/${id}`);
            if (!stockDataRequest.ok) {
                throw Error(stockDataRequest.statusText);
            }

            const stockData = await stockDataRequest.json();
            return stockData.Data;
        } catch (error) {
            console.log(`Error occured while fetching stock data: ${error}`);
            return null;
        }
    }
}

export default APIService;