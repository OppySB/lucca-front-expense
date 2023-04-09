/**
 * Structure de données de la dépense
 */
export interface Expense {

    /**
     * Identifiant de la dépense
     */
    id?: string;

    /**
     * Nature de la dépense
     * 'trip' ou 'restaurant'
     */
    nature?: string;

    /**
     * Montant de la dépense
     */
    amount?: number;

    /**
     * Commentaire de la dépense
     */
    comment?: string;

    /**
     * Date de la dépense
     */
    purchasedOn?: string;

    /**
     * Date de mise à jour
     */
    updatedAt?: string;

    /**
     * distance du voyage
     */
    distance?: number;

    /**
     * nombre d'invité
     */
    invites?: number;

}
