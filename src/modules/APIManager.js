const remoteURL = "http://localhost:7770";

export default {
    get(component, id) {
        return fetch(`${remoteURL}/${component}/${id}`).then(result =>
            result.json()
        );
    },
    getLabel() {
        return fetch(`${remoteURL}/labels?id=${1}`).then(result => result.json());
    },
    getWithExpand(component, id, expand) {
        return fetch(`${remoteURL}/${component}/${id}?_expand=${expand}`).then(result =>
            result.json()
        );
    },
    getAll(component) {
        return fetch(`${remoteURL}/${component}`).then(result =>
            result.json()
        );
    },
    getAllWithUserId(component, userId) {
        return fetch(`${remoteURL}/${component}?userId=${userId}`).then(result =>
            result.json()
        );
    },
    getAllWithArtistId(component, artistId) {
        return fetch(`${remoteURL}/${component}?artistId=${artistId}`).then(result =>
            result.json()
        );
    },
    getAllWithProjectId(component, projectId) {
        return fetch(`${remoteURL}/${component}?projectId=${projectId}`).then(result =>
            result.json()
        );
    },
    getByUserIdAndArtistId(component, userId, artistId) {
        return fetch(`${remoteURL}/${component}?userId=${userId}&artistId=${artistId}`).then(result =>
            result.json()
        );
    },
    getAllWithExpand(component, expand) {
        return fetch(`${remoteURL}/${component}?_expand=${expand}`).then(result =>
            result.json()
        );
    },
    getById(component, id) {
        return fetch(`${remoteURL}/${component}?id=${id}`).then(result => result.json());
    },
    getByIdWithExpand(component, id, expand) {
        return fetch(`${remoteURL}/${component}?id=${id}&_expand=${expand}`).then(result => result.json());
    },
    getLogin(component, email) {
        return fetch(`${remoteURL}/${component}?email=${email}`).then(result => result.json());
    },
    getUsername(component, username) {
        return fetch(`${remoteURL}/${component}?username=${username}`).then(result => result.json());
    },
    delete(component, id) {
        return fetch(`${remoteURL}/${component}/${id}`, {
            method: "DELETE"
        }).then(result => result.json());
    },
    post(component, newObject) {
        return fetch(`${remoteURL}/${component}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        }).then(data => data.json());
    },
    update(component, editedObject) {
        return fetch(`${remoteURL}/${component}/${editedObject.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedObject)
        }).then(data => data.json());
    },
    updatePut(component, editedObject) {
        return fetch(`${remoteURL}/${component}/${editedObject.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedObject)
        }).then(data => data.json());
    }
};
