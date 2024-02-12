interface EventData {
    code: string;
    num_event: string;
    seats: string;
    title: string | null;
    description: string | null;
    nb_inscrits: string;
    begin: string;
    end: string;
    id_activite: string;
    location: string;
    nb_max_students_projet: string | null;
    already_register: string;
    user_status: string | null;
    allow_token: string;
    assistants: Assistant[];
}

interface Assistant {
    login: string;
    title: string;
    picture: string;
    manager_status: string;
}

export default EventData;
