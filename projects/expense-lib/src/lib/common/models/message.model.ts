/**
 * Structure de données d'un message à afficher
 */
export interface Message {

    /**
     * type de notification
     */
    severity: string;

    /**
     * Temps avant que le message ne disparaisse
     */
    life: number;

    /**
     * Est fermable ou pas
     */
    closable: boolean;

    /**
     * Titre du message
     */
    summary: string;
    
    /**
     * corps du message
     */
    detail: string;

}
