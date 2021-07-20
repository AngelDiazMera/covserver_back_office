
export interface EnterpriseData {
    email?: string;
    name?: string;
    acronym?: string;
}
// The data retrieved from server when the client auths is saved on the 
// enterprise attribute
// To get the data: Enterprise.getInstance()
// To set the data: Enterprise.setInstance({ ... })
export default class Enterprise {
    private static instance: Enterprise;

    private static enterprise: EnterpriseData;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): EnterpriseData {
        if (!Enterprise.instance) {
            Enterprise.instance = new Enterprise();
        }

        return Enterprise.enterprise;
    }

    public static setInstance(enterprise: EnterpriseData): void {
        Enterprise.enterprise = enterprise;
    }

    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    public someBusinessLogic() {
        // ...
    }
}