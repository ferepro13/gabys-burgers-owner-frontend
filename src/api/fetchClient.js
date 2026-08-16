const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

/** 
 * Funcion q envuelve a fetch para agregar logica comun
 * URL base
 * Headers automaticos, incluyendo tokens
 * Manejo de errores 401
*/

export const fecthClient = async (endpoint, options={}) => {
    const url = `${BASE_URL}${endpoint}`;

    const token = localStorage.getItem("token");

    //headers default
    const headers = {
        "Content-Type": "application/json", // no se debe especificar cuando se usa FormData
        ...options.headers
    }

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    let body = options.body;

    // Si el body es un objeto y no es FormData, lo serializamos a JSON
    if (body && typeof body === "object" && !(body instanceof FormData)) {
        body = JSON.stringify(body);
    }

    if (body instanceof FormData) {
        delete headers["Content-Type"]
    };
    const config = {...options, headers, body}; // body ya es string o FormData

    try {
        const response = await fetch(url, config)

        if (response.status === 401) {
            const isAuthEndpoint = endpoint.includes("/auth/login") || endpoint.includes("/auth/register")

            if (!isAuthEndpoint) {
                // token invalido o expirado, limpiar sesion
                localStorage.removeItem("token");
                // redirigir al login, puede usarse window.location o un evento global
                window.location.href = "/login"
            }
        }

        // parsear la respuesta JSON (puede ser texto vacio si es 204)
        const contentType = response.headers.get("content-type")
        let data;
        if (contentType && contentType.includes("application/json")) {
            data = await response.json();
        } else {
            data = await response.text();
        }

        if (!response.ok) {
            throw {status: response.status, data};
        }

        return data
    } catch (error) {
        // propagar si es error de red o parseo
        console.log("ERROR: ", error);
        throw error;
    }
}

// metodos auxiliares para CRUD

export const get = (endpoint, options={}) => 
    fecthClient(endpoint, {...options, method:"GET"})


export const post = (endpoint, body, options={}) => 
    fecthClient(endpoint, {...options, method:"POST", body})


export const put = (endpoint, body, options={}) => 
    fecthClient(endpoint, {...options, method:"PUT", body})


export const del = (endpoint, options={}) => 
    fecthClient(endpoint, {...options, method:"DELETE"})


export default fecthClient;