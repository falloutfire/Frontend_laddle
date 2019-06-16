export const defaultUser = {
    firstName: "",
    secondName: "",
    middleName: "",
    login: "",
    password: "",
    shop_id: "",
    id: ""
};

export const usersDescription = {
    id: {
        descriptionFieldType: 'textField',
        editableField: false,
        flexValues: {
            xs12: true,
            sm6: true,
        },
        label: 'id',
    },
    shop_id: {
        descriptionFieldType: 'textField',
        editableField: false,
        flexValues: {
            xs12: true,
            sm6: true,
        },
        label: 'shop_id',
    },
    firstName: {
        descriptionFieldType: 'textField',
        flexValues: {
            xs12: true,
            sm6: true,
        },
        label: 'First name',
    },
    secondName: {
        descriptionFieldType: 'textField',
        flexValues: {
            xs12: true,
            sm6: true,
        },
        label: 'Second Name',
    },
    middleName: {
        descriptionFieldType: 'textField',
        flexValues: {
            xs12: true,
            sm6: true,
        },
        label: 'Middle Name',
    },
    login: {
        descriptionFieldType: 'textField',
        flexValues: {
            xs12: true,
            sm6: true,
        },
        label: 'Login',
    },
    password: {
        descriptionFieldType: 'textField',
        showInTable: false,
        flexValues: {
            xs12: true,
        },
        label: 'Password',
        type: 'password'
    },
};
