const remoteURL = "http://localhost:7770";

export default {
    get(component, id) {
        return fetch(`${remoteURL}/${component}/${id}`).then(result =>
            result.json()
        );
    },
    getAll(component) {
        return fetch(`${remoteURL}/${component}`).then(result =>
            result.json()
        );
    },
    getLogin(component, email) {
        return fetch(
            `${remoteURL}/${component}?email=${email}`
        ).then(result => result.json());
    },
    checkEmail(component, email) {
        return fetch(`${remoteURL}/${component}?email=${email}`).then(r =>
            r.json()
        );
    },
    getAllWithUserId(component, userId) {
        return fetch(`${remoteURL}/${component}?userId=${userId}`).then(result =>
            result.json()
        );
    },
    getAllWithUserIdExpand(component, userId, expandItem) {
        return fetch(
            `${remoteURL}/${component}?userId=${userId}&_expand=${expandItem}`
        ).then(result => result.json());
    },
    getWithEmbed(component, id, embedItem) {
        return fetch(
            `${remoteURL}/${component}/${id}?_embed=${embedItem}`
        ).then(result => result.json());
    },
    getAllWithEmbed(component, embedItem) {
        return fetch(`${remoteURL}/${component}?_embed=${embedItem}`).then(result =>
            result.json()
        );
    },
    getWithExpand(component, id, expandItem) {
        return fetch(
            `${remoteURL}/${component}/${id}?_expand=${expandItem}`
        ).then(result => result.json());
    },
    getAllWithExpand(component, expandItem) {
        return fetch(
            `${remoteURL}/${component}?_expand=${expandItem}`
        ).then(result => result.json());
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
