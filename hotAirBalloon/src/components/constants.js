const ANIMATION_PHASES = {
    START: 'START',
    GO_TO: 'GO_TO',
    RESET: 'RESET'
};
export default ANIMATION_PHASES;

export const returnAnimationClassesNames = (classPrefix) => {
    return {
        RESET: `${classPrefix}--animation-reset`,
        START: `${classPrefix}--animation-in`,
        GO_TO: `${classPrefix}--animation-out`
    }
};
