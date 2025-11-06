const Seeker = require("../models/Seeker");
const Caregiver = require("../models/Caregiver");

exports.matchCaregiver = async (req, res) => {
  try {
    const seeker = await Seeker.findById(req.params.seekerId);
    if (!seeker) return res.status(404).json({ message: "Seeker không tồn tại" });

    const caregivers = await Caregiver.find();

    let results = [];

    caregivers.forEach(cg => {
      // Hard Filter: schedule phải khớp
      const hasScheduleMatch = seeker.schedule.some(s => cg.availability.includes(s));
      if (!hasScheduleMatch) return;

      // Soft Score
      const skillsMatch = seeker.requiredSkills.filter(skill => cg.skills.includes(skill)).length;
      const scoreSkills = skillsMatch / seeker.requiredSkills.length; 

      const locationMatch = cg.locations.includes(seeker.location) ? 1 : 0;

      const score = 
        (scoreSkills * 0.5) +
        (locationMatch * 0.3) +
        ((cg.rating / 5) * 0.2);

      results.push({
        caregiver: cg,
        score: score.toFixed(3)
      });
    });

    results.sort((a, b) => b.score - a.score);

    res.json(results.slice(0, 5)); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
