export const defaultLadle = {
    name: "",
    id: "",
    shop_id: "",
    photo: "",
    zones: [],
};

export const ladleDescription = {
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
    name: {
        descriptionFieldType: 'textField',
        flexValues: {
            xs12: true,
            sm6: true,
        },
        label: 'Name',
    },
    photo: {
        descriptionFieldType: 'photoField',
        flexValues: {
            xs12: true,
        },
        showInTable: false,
        label: 'Photo',
    },
};
