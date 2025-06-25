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
    }
}

export default useTreeProvider