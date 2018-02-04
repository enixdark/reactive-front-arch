export const insertCharacter = char => ({
    type: 'CHARACTER_TYPED',
    char,
});

export const removeCharacter = char => ({
    type: 'REMOVE',
    char
});