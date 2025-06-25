import type { FlatMap } from "../types/types";

type Change = {
    id: number;
    status: "PASS" | "FAIL" | null;
    reason: string | null;
};
  
function getChanges(current: FlatMap, original: FlatMap): Change[] {
    const changes: Change[] = [];

    for (const id in current) {
        const currentNode = current[id];
        const originalNode = original[id];

        if (!originalNode) continue;

        if (
            currentNode.status !== originalNode.status ||
            currentNode.reason !== originalNode.reason
        ) {
            changes.push({
                id: currentNode.id,
                status: currentNode.status,
                reason: currentNode.reason
            });
        }
    }
    return changes;
}

export default getChanges