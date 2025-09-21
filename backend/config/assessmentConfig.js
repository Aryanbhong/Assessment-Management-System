// backend/config/assessmentConfig.js

const assessmentConfigurations = {
  "as_hr_02": {
    name: "Health & Fitness Assessment",
    template: "health-fitness",
    sections: [
      {
        id: "key_vitals",
        title: "Key Body Vitals",
        fields: [
          {
            label: "Overall Health Score",
            path: "accuracy",
            unit: "%",
            classification: {
              excellent: { min: 85, max: 100, color: "#22c55e" },
              good: { min: 70, max: 84, color: "#3b82f6" },
              average: { min: 50, max: 69, color: "#f59e0b" },
              poor: { min: 0, max: 49, color: "#ef4444" }
            }
          },
          {
            label: "Heart Rate",
            path: "vitalsMap.vitals.heart_rate",
            unit: "bpm",
            classification: {
              excellent: { min: 60, max: 80, color: "#22c55e" },
              good: { min: 50, max: 100, color: "#3b82f6" },
              average: { min: 40, max: 120, color: "#f59e0b" },
              poor: { min: 0, max: 200, color: "#ef4444" }
            }
          },
          {
            label: "Blood Pressure Systolic",
            path: "vitalsMap.vitals.bp_sys",
            unit: "mmHg",
            classification: {
              excellent: { min: 90, max: 120, color: "#22c55e" },
              good: { min: 80, max: 140, color: "#3b82f6" },
              average: { min: 70, max: 160, color: "#f59e0b" },
              poor: { min: 0, max: 300, color: "#ef4444" }
            }
          },
          {
            label: "Blood Pressure Diastolic",
            path: "vitalsMap.vitals.bp_dia",
            unit: "mmHg",
            classification: {
              excellent: { min: 60, max: 80, color: "#22c55e" },
              good: { min: 50, max: 90, color: "#3b82f6" },
              average: { min: 40, max: 100, color: "#f59e0b" },
              poor: { min: 0, max: 200, color: "#ef4444" }
            }
          },
          {
            label: "Oxygen Saturation",
            path: "vitalsMap.vitals.oxy_sat_prcnt",
            unit: "%",
            classification: {
              excellent: { min: 95, max: 100, color: "#22c55e" },
              good: { min: 90, max: 94, color: "#3b82f6" },
              average: { min: 85, max: 89, color: "#f59e0b" },
              poor: { min: 0, max: 84, color: "#ef4444" }
            }
          }
        ]
      },
      {
        id: "heart_health",
        title: "Heart Health",
        fields: [
          {
            label: "Wellness Score",
            path: "vitalsMap.wellness_score",
            unit: "points",
            classification: {
              excellent: { min: 80, max: 100, color: "#22c55e" },
              good: { min: 65, max: 79, color: "#3b82f6" },
              average: { min: 50, max: 64, color: "#f59e0b" },
              poor: { min: 0, max: 49, color: "#ef4444" }
            }
          },
          {
            label: "VO2 Max",
            path: "vitalsMap.metadata.physiological_scores.vo2max",
            unit: "ml/kg/min",
            classification: {
              excellent: { min: 50, max: 100, color: "#22c55e" },
              good: { min: 40, max: 49, color: "#3b82f6" },
              average: { min: 30, max: 39, color: "#f59e0b" },
              poor: { min: 0, max: 29, color: "#ef4444" }
            }
          },
          {
            label: "Cardiac Output",
            path: "vitalsMap.metadata.cardiovascular.cardiac_out",
            unit: "L/min",
            classification: {
              excellent: { min: 5, max: 8, color: "#22c55e" },
              good: { min: 4, max: 6, color: "#3b82f6" },
              average: { min: 3, max: 5, color: "#f59e0b" },
              poor: { min: 0, max: 4, color: "#ef4444" }
            }
          }
        ]
      },
      {
        id: "stress_level",
        title: "Stress Level",
        fields: [
          {
            label: "Stress Index",
            path: "vitalsMap.metadata.heart_scores.stress_index",
            unit: "index",
            classification: {
              excellent: { min: 0, max: 1, color: "#22c55e" },
              good: { min: 1, max: 2, color: "#3b82f6" },
              average: { min: 2, max: 3, color: "#f59e0b" },
              poor: { min: 3, max: 10, color: "#ef4444" }
            }
          },
          {
            label: "HRV (RMSSD)",
            path: "vitalsMap.metadata.heart_scores.rmssd",
            unit: "ms",
            classification: {
              excellent: { min: 40, max: 100, color: "#22c55e" },
              good: { min: 25, max: 39, color: "#3b82f6" },
              average: { min: 15, max: 24, color: "#f59e0b" },
              poor: { min: 0, max: 14, color: "#ef4444" }
            }
          }
        ]
      },
      {
        id: "fitness_levels",
        title: "Fitness Levels",
        fields: [
          {
            label: "Cardiovascular Endurance",
            path: "exercises[?(@.id==235)].setList[0].time",
            unit: "seconds",
            classification: {
              excellent: { min: 60, max: 120, color: "#22c55e" },
              good: { min: 45, max: 79, color: "#3b82f6" },
              average: { min: 30, max: 59, color: "#f59e0b" },
              poor: { min: 0, max: 44, color: "#ef4444" }
            }
          },
          {
            label: "Squat Performance",
            path: "exercises[?(@.id==259)].correctReps",
            unit: "reps",
            classification: {
              excellent: { min: 35, max: 50, color: "#22c55e" },
              good: { min: 25, max: 34, color: "#3b82f6" },
              average: { min: 15, max: 24, color: "#f59e0b" },
              poor: { min: 0, max: 14, color: "#ef4444" }
            }
          }
        ]
      },
      {
        id: "posture",
        title: "Posture Analysis",
        fields: [
          {
            label: "Frontal View Score",
            path: "exercises[?(@.id==73)].analysisScore",
            unit: "%",
            classification: {
              excellent: { min: 85, max: 100, color: "#22c55e" },
              good: { min: 70, max: 84, color: "#3b82f6" },
              average: { min: 50, max: 69, color: "#f59e0b" },
              poor: { min: 0, max: 49, color: "#ef4444" }
            }
          },
          {
            label: "Side View Score",
            path: "exercises[?(@.id==74)].analysisScore",
            unit: "%",
            classification: {
              excellent: { min: 85, max: 100, color: "#22c55e" },
              good: { min: 70, max: 84, color: "#3b82f6" },
              average: { min: 50, max: 69, color: "#f59e0b" },
              poor: { min: 0, max: 49, color: "#ef4444" }
            }
          }
        ]
      },
      {
        id: "body_composition",
        title: "Body Composition",
        fields: [
          {
            label: "BMI",
            path: "bodyCompositionData.BMI",
            unit: "kg/m²",
            classification: {
              excellent: { min: 18.5, max: 24.9, color: "#22c55e" },
              good: { min: 25, max: 29.9, color: "#3b82f6" },
              average: { min: 30, max: 34.9, color: "#f59e0b" },
              poor: { min: 35, max: 100, color: "#ef4444" }
            }
          },
          {
            label: "Body Fat Percentage",
            path: "bodyCompositionData.BFC",
            unit: "%",
            classification: {
              excellent: { min: 10, max: 20, color: "#22c55e" },
              good: { min: 20, max: 25, color: "#3b82f6" },
              average: { min: 25, max: 30, color: "#f59e0b" },
              poor: { min: 30, max: 50, color: "#ef4444" }
            }
          },
          {
            label: "Muscle Mass",
            path: "bodyCompositionData.LM",
            unit: "kg",
            classification: {
              excellent: { min: 70, max: 100, color: "#22c55e" },
              good: { min: 60, max: 79, color: "#3b82f6" },
              average: { min: 50, max: 69, color: "#f59e0b" },
              poor: { min: 0, max: 49, color: "#ef4444" }
            }
          }
        ]
      }
    ]
  },
  "as_card_01": {
    name: "Cardiac Assessment",
    template: "cardiac",
    sections: [
      {
        id: "key_vitals",
        title: "Key Body Vitals",
        fields: [
          {
            label: "Overall Health Score",
            path: "accuracy",
            unit: "%",
            classification: {
              excellent: { min: 85, max: 100, color: "#22c55e" },
              good: { min: 70, max: 84, color: "#3b82f6" },
              average: { min: 50, max: 69, color: "#f59e0b" },
              poor: { min: 0, max: 49, color: "#ef4444" }
            }
          },
          {
            label: "Heart Rate",
            path: "vitalsMap.vitals.heart_rate",
            unit: "bpm",
            classification: {
              excellent: { min: 60, max: 80, color: "#22c55e" },
              good: { min: 50, max: 100, color: "#3b82f6" },
              average: { min: 40, max: 120, color: "#f59e0b" },
              poor: { min: 0, max: 200, color: "#ef4444" }
            }
          },
          {
            label: "Blood Pressure Systolic",
            path: "vitalsMap.vitals.bp_sys",
            unit: "mmHg",
            classification: {
              excellent: { min: 90, max: 120, color: "#22c55e" },
              good: { min: 80, max: 140, color: "#3b82f6" },
              average: { min: 70, max: 160, color: "#f59e0b" },
              poor: { min: 0, max: 300, color: "#ef4444" }
            }
          },
          {
            label: "Blood Pressure Diastolic",
            path: "vitalsMap.vitals.bp_dia",
            unit: "mmHg",
            classification: {
              excellent: { min: 60, max: 80, color: "#22c55e" },
              good: { min: 50, max: 90, color: "#3b82f6" },
              average: { min: 40, max: 100, color: "#f59e0b" },
              poor: { min: 0, max: 200, color: "#ef4444" }
            }
          }
        ]
      },
      {
        id: "cardiovascular_endurance",
        title: "Cardiovascular Endurance",
        fields: [
          {
            label: "Jog Test Duration",
            path: "exercises[?(@.id==235)].setList[0].time",
            unit: "seconds",
            classification: {
              excellent: { min: 60, max: 120, color: "#22c55e" },
              good: { min: 45, max: 79, color: "#3b82f6" },
              average: { min: 30, max: 59, color: "#f59e0b" },
              poor: { min: 0, max: 44, color: "#ef4444" }
            }
          },
          {
            label: "Cardiac Output",
            path: "vitalsMap.metadata.cardiovascular.cardiac_out",
            unit: "L/min",
            classification: {
              excellent: { min: 5, max: 8, color: "#22c55e" },
              good: { min: 4, max: 6, color: "#3b82f6" },
              average: { min: 3, max: 5, color: "#f59e0b" },
              poor: { min: 0, max: 4, color: "#ef4444" }
            }
          },
          {
            label: "VO2 Max",
            path: "vitalsMap.metadata.physiological_scores.vo2max",
            unit: "ml/kg/min",
            classification: {
              excellent: { min: 50, max: 100, color: "#22c55e" },
              good: { min: 40, max: 49, color: "#3b82f6" },
              average: { min: 30, max: 39, color: "#f59e0b" },
              poor: { min: 0, max: 29, color: "#ef4444" }
            }
          }
        ]
      },
      {
        id: "body_composition",
        title: "Body Composition",
        fields: [
          {
            label: "BMI",
            path: "bodyCompositionData.BMI",
            unit: "kg/m²",
            classification: {
              excellent: { min: 18.5, max: 24.9, color: "#22c55e" },
              good: { min: 25, max: 29.9, color: "#3b82f6" },
              average: { min: 30, max: 34.9, color: "#f59e0b" },
              poor: { min: 35, max: 100, color: "#ef4444" }
            }
          },
          {
            label: "Body Fat Percentage",
            path: "bodyCompositionData.BFC",
            unit: "%",
            classification: {
              excellent: { min: 10, max: 20, color: "#22c55e" },
              good: { min: 20, max: 25, color: "#3b82f6" },
              average: { min: 25, max: 30, color: "#f59e0b" },
              poor: { min: 30, max: 50, color: "#ef4444" }
            }
          }
        ]
      }
    ]
  }
};

// // Helper function to extract value using JSONPath-like syntax
// function extractValue(data, path) {
//   try {
//     // Handle array queries like exercises[?(@.id==235)].setList[0].time
//     if (path.includes('[?(@.')) {
//       const parts = path.split('[?(@.');
//       const basePath = parts[0];
//       const condition = parts[1].split(')').shift();
//       const remainingPath = parts[1].split(').')[1];
      
//       const baseData = getNestedValue(data, basePath);
//       if (!Array.isArray(baseData)) return null;
      
//       const [field, value] = condition.split('==');
//       const filteredItem = baseData.find(item => 
//         item[field] == value.replace(/"/g, '')
//       );
      
//       if (!filteredItem) return null;
//       return getNestedValue(filteredItem, remainingPath);
//     }
    
//     // Handle regular dot notation
//     return getNestedValue(data, path);
//   } catch (error) {
//     console.error(`Error extracting value for path ${path}:`, error);
//     return null;
//   }
// }

// // Helper function to get nested object value
// function getNestedValue(obj, path) {
//   return path.split('.').reduce((current, key) => {
//     if (current && current.hasOwnProperty(key)) {
//       return current[key];
//     }
//     return null;
//   }, obj);
// // }
// function extractValue(data, path) {
//   try {
//     if (!path) return '';

//     // Handle array queries like exercises[?(@.id==235)].setList[0].time
//     if (path.includes('[?(@.')) {
//       const parts = path.split('[?(@.');
//       const basePath = parts[0];
//       const condition = parts[1].split(')').shift();
//       const remainingPath = parts[1].split(').')[1];

//       const baseData = getNestedValue(data, basePath);
//       if (!Array.isArray(baseData)) return '';

//       const [field, value] = condition.split('==');
//       const filteredItem = baseData.find(item =>
//         String(item[field]) === value.replace(/"/g, '')
//       );

//       if (!filteredItem) return '';
//       const val = getNestedValue(filteredItem, remainingPath);
//       return val != null ? String(val) : '';
//     }

//     // Handle regular dot notation
//     const val = getNestedValue(data, path);
//     return val != null ? String(val) : '';
//   } catch (error) {
//     console.warn(`Error extracting value for path ${path}:`, error.message);
//     return '';
//   }
// }


function extractValue(data, path) {
  try {
    if (!path) return '';

    if (path.includes('[?(@.')) {
      const parts = path.split('[?(@.');
      const basePath = parts[0];
      const condition = parts[1].split(')').shift();
      const remainingPath = parts[1].split(').')[1] || ''; // fallback to empty string

      const baseData = getNestedValue(data, basePath);
      if (!Array.isArray(baseData)) return '';

      const [field, value] = condition.split('==');
      const filteredItem = baseData.find(item =>
        String(item[field]) === value.replace(/"/g, '')
      );

      if (!filteredItem) return '';
      const val = getNestedValue(filteredItem, remainingPath);
      return val != null ? String(val) : '';
    }

    const val = getNestedValue(data, path);
    return val != null ? String(val) : '';
  } catch (error) {
    console.warn(`Error extracting value for path ${path}:`, error.message);
    return '';
  }
}


function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    if (current && current.hasOwnProperty(key)) {
      return current[key];
    }
    return null;
  }, obj);
}


// Helper function to classify a value based on ranges
function classifyValue(value, classification) {
  if (value === null || value === undefined) return null;
  
  const numValue = parseFloat(value);
  if (isNaN(numValue)) return null;
  
  for (const [level, range] of Object.entries(classification)) {
    if (numValue >= range.min && numValue <= range.max) {
      return {
        level,
        color: range.color,
        range: `${range.min}-${range.max}`
      };
    }
  }
  
  return {
    level: 'unknown',
    color: '#6b7280',
    range: 'N/A'
  };
}

// module.exports = {
//   assessmentConfigurations,
//   extractValue,
//   classifyValue
// };

module.exports ={
    assessmentConfigurations,
    extractValue,
    classifyValue
}