import { Button, Input, Select } from '@/Components/UI/Form';
import { GroupBy } from '@/Enums';
import { useState } from 'react';

export default function DateRangeGroupFilter({
    startDate,
    endDate,
    groupBy,
    onFilter,
}: {
    startDate: string;
    endDate: string;
    groupBy: GroupBy;
    onFilter: (startDate: string, endDate: string, groupBy: GroupBy) => void;
}) {
    const [selectedStartDate, setSelectedStartDate] =
        useState<string>(startDate);
    const [selectedEndDate, setSelectedEndDate] = useState<string>(endDate);
    const [selectedGroupBy, setSelectedGroupBy] = useState<GroupBy>(groupBy);

    const handleFilter = () => {
        onFilter(selectedStartDate, selectedEndDate, selectedGroupBy);
    };

    return (
        <div className="flex items-center gap-2">
            <Input
                onChange={(e) => setSelectedStartDate(e.target.value)}
                type="date"
                value={selectedStartDate}
            />
            <div>to</div>
            <Input
                onChange={(e) => setSelectedEndDate(e.target.value)}
                type="date"
                value={selectedEndDate}
            />
            <Select
                onChange={(e) => setSelectedGroupBy(e.target.value as GroupBy)}
                value={selectedGroupBy}
            >
                {(Object.keys(GroupBy) as Array<keyof typeof GroupBy>).map(
                    (key) => {
                        return (
                            <option key={key} value={GroupBy[key]}>
                                {key}
                            </option>
                        );
                    },
                )}
            </Select>
            <Button onClick={handleFilter}>Filter</Button>
        </div>
    );
}
