import { useContext } from "react";
import { TreeContext } from "../../state/TreeContext";

const useTreeProvider = () => {
    const {
        workingState,
        setWorkingState,
        isLoading,
        setIsLoading,
        handleFail,
        handlePass,
        data,
        save,
        revert,
        error,
    } = useContext(TreeContext)

    return {
        workingState,
        setWorkingState,
        isLoading,
        setIsLoading,
        handleFail,
        handlePass,
        data,
        save,
        revert,
        error,
    }
}

export default useTreeProvider