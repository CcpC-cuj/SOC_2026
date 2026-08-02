import { Pill } from "./ui";

export default function ProfileModel({
    student, onClose}){
        if(!student) return null;
        console.log("Modal student:", student);

        return(
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-[#fbf7ec] rounded-2xl w-[500px] max-w-[95vw] p-6">

                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-semibold">
                        Student Profile
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl"
                    >
                        ×
                    </button>
                </div>

                <div className="flex items-center gap-4 mb-6">

                    {student.avatar ? (
                        <img
                            src={student.avatar}
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-[#d8ceb0] flex items-center justify-center text-2xl font-semibold">
                            {student.name
                                ?.split(" ")
                                .map((x) => x[0])
                                .join("")
                                .slice(0, 2)}
                        </div>
                    )}

                    <div>
                        <h3 className="text-xl font-semibold">
                            {student.name}
                        </h3>
                  
                        <p className="text-[#5a6a85]">
                            {student.rollNumber}
                        </p>
                  
                        <p className="text-[#5a6a85]">
                            Semester {student.semester}
                        </p>
                    </div>
                  
                </div>
                  
                {student.bio && (
                    <>
                        <h4 className="font-semibold mb-1">
                            Bio
                        </h4>
                
                        <p className="text-sm text-[#5a6a85] mb-5">
                            {student.bio}
                        </p>
                    </>
                )}

                {student.skills?.length > 0 && (
                    <>
                        <h4 className="font-semibold mb-2">
                            Skills
                        </h4>
                
                        <div className="flex flex-wrap gap-2">
                            {(student.skills || []).map((skill) => (
                                <Pill
                                    key={skill}
                                    color="blue"
                                >
                                    {skill}
                                </Pill>
                            ))}
                        </div>
                    </>
                )}

            </div>
        </div>
        );
}