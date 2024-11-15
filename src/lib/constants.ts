export interface IInputProps {
    title: string,
    value?: string,
    onChange: (value: string) => void,
    onSelect: (value: any) => void,
    data: any[],
    disabled?: boolean,
    controlled?: boolean
}

export interface IGridProps {
    rowsPerPage?: number,
    data: any[],
    getData: () => any[],
    onClick?: (item: IGHIssue) => void
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    data?: any | null;
}

export interface IGHUser {
    score: number,
    name: string,
    id: number,
    avatar_url: string,
}

export interface IGHRepo {
    description: string,
    has_issues: boolean,
    id: number,
    name: string,
    score: number,
}

export interface IGHIssue {
    id: number,
    title: string,
    body: string,
    updated_at: string,
}