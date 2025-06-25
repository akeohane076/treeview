import { useContext } from "react";
import { TreeContext } from "../../state/TreeContext";

const useTreeProvider = () => {
    const {
        savedState,
        workingState,
        setWorkingState,
        setSavedState,
        isLoading,
        setIsLoading,
        handleFail,
        handlePass
    } = useContext(TreeContext)

    return {
        savedState,
        workingState,
        setWorkingState,
        setSavedState,
        isLoading,
        setIsLoading,
        handleFail,
        handlePass
    }
}

export default useTreeProvider