package com.veridia.hiring.service;

import com.veridia.hiring.model.Job;
import com.veridia.hiring.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @PostConstruct
    public void initializeDefaultJobs() {
        if (jobRepository.count() == 0) {
            System.out.println("=== Initializing Default Jobs ===");
            createDefaultJobs();
        }
    }

    private void createDefaultJobs() {
        Job job1 = new Job();
        job1.setTitle("Senior Frontend Developer");
        job1.setDepartment("Engineering");
        job1.setLocation("Bangalore / Remote");
        job1.setType("Full-time");
        job1.setExperience("5+ years");
        job1.setSalary("8 LPA - 12 LPA");
        job1.setCategory("engineering");
        job1.setDescription("Build amazing user interfaces and help shape the future of our platform. Work with cutting-edge technologies and collaborate with world-class engineers.");
        job1.setRequirements("React, TypeScript, Node.js, 5+ years experience");
        job1.setPosted("true");
        job1.setApplicants(45);
        job1.setFeatured(true);
        job1.setCreatedAt(LocalDateTime.now());
        job1.setUpdatedAt(LocalDateTime.now());
        jobRepository.save(job1);

        Job job2 = new Job();
        job2.setTitle("Product Manager");
        job2.setDepartment("Product");
        job2.setLocation("Hyderabad / Hybrid");
        job2.setType("Full-time");
        job2.setExperience("3-5 years");
        job2.setSalary("6 LPA - 9 LPA");
        job2.setCategory("product");
        job2.setDescription("Drive product strategy and work with cross-functional teams to deliver exceptional products that users love.");
        job2.setRequirements("Product strategy, Data analysis, Leadership, 3+ years experience");
        job2.setPosted("true");
        job2.setApplicants(32);
        job2.setFeatured(true);
        job2.setCreatedAt(LocalDateTime.now());
        job2.setUpdatedAt(LocalDateTime.now());
        jobRepository.save(job2);

        Job job3 = new Job();
        job3.setTitle("Backend Engineer");
        job3.setDepartment("Engineering");
        job3.setLocation("Pune");
        job3.setType("Full-time");
        job3.setExperience("3-5 years");
        job3.setSalary("7 LPA - 10 LPA");
        job3.setCategory("engineering");
        job3.setDescription("Design and implement scalable backend systems and APIs that power our platform.");
        job3.setRequirements("Java, Spring Boot, Microservices, 3+ years experience");
        job3.setPosted("true");
        job3.setApplicants(28);
        job3.setFeatured(false);
        job3.setCreatedAt(LocalDateTime.now());
        job3.setUpdatedAt(LocalDateTime.now());
        jobRepository.save(job3);

        Job job4 = new Job();
        job4.setTitle("UX Designer");
        job4.setDepartment("Design");
        job4.setLocation("Bangalore");
        job4.setType("Full-time");
        job4.setExperience("2-4 years");
        job4.setSalary("5 LPA - 7 LPA");
        job4.setCategory("design");
        job4.setDescription("Create beautiful and intuitive user experiences that delight our users.");
        job4.setRequirements("Figma, User research, Prototyping, 2+ years experience");
        job4.setPosted("true");
        job4.setApplicants(19);
        job4.setFeatured(false);
        job4.setCreatedAt(LocalDateTime.now());
        job4.setUpdatedAt(LocalDateTime.now());
        jobRepository.save(job4);

        Job job5 = new Job();
        job5.setTitle("Data Scientist");
        job5.setDepartment("Data");
        job5.setLocation("Remote / Pune");
        job5.setType("Full-time");
        job5.setExperience("4-6 years");
        job5.setSalary("6 LPA - 8 LPA");
        job5.setCategory("data");
        job5.setDescription("Apply machine learning and statistical analysis to solve complex business problems.");
        job5.setRequirements("Python, Machine Learning, Statistics, 4+ years experience");
        job5.setPosted("true");
        job5.setApplicants(52);
        job5.setFeatured(true);
        job5.setCreatedAt(LocalDateTime.now());
        job5.setUpdatedAt(LocalDateTime.now());
        jobRepository.save(job5);

        System.out.println("=== Created " + jobRepository.count() + " default jobs ===");
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Job> getFeaturedJobs() {
        return jobRepository.findByFeaturedTrue();
    }

    public List<Job> getJobsByCategory(@NonNull String category) {
        return jobRepository.findByCategory(category);
    }

    public List<Job> getJobsByLocation(@NonNull String location) {
        return jobRepository.findByLocationContainingIgnoreCase(location);
    }

    public List<Job> searchJobs(@NonNull String search, @NonNull String category, @NonNull String location) {
        return jobRepository.findJobsWithFilters(search, category, location);
    }

    public Job getJobById(@NonNull Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    public Job createJob(@NonNull Job job) {
        return jobRepository.save(job);
    }

    public Job updateJob(@NonNull Long id, @NonNull Job jobDetails) {
        Job job = getJobById(id);
        if (job != null) {
            job.setTitle(jobDetails.getTitle());
            job.setDepartment(jobDetails.getDepartment());
            job.setLocation(jobDetails.getLocation());
            job.setType(jobDetails.getType());
            job.setExperience(jobDetails.getExperience());
            job.setSalary(jobDetails.getSalary());
            job.setCategory(jobDetails.getCategory());
            job.setDescription(jobDetails.getDescription());
            job.setRequirements(jobDetails.getRequirements());
            job.setPosted(jobDetails.getPosted());
            job.setFeatured(jobDetails.getFeatured());
            return jobRepository.save(job);
        }
        return null;
    }

    public void deleteJob(@NonNull Long id) {
        jobRepository.deleteById(id);
    }

    public Map<String, Object> getJobFilters() {
        Map<String, Object> filters = new HashMap<>();
        
        // Get categories with counts
        List<String> categories = jobRepository.findAllCategories();
        Map<String, Integer> categoryCounts = new HashMap<>();
        categoryCounts.put("all", getAllJobs().size());
        
        for (String category : categories) {
            if (category != null) {
                categoryCounts.put(category, getJobsByCategory(category).size());
            }
        }
        filters.put("categories", categoryCounts);
        
        // Get locations
        List<String> locations = jobRepository.findAllLocations();
        Map<String, String> locationOptions = new HashMap<>();
        locationOptions.put("all", "All Locations");
        locationOptions.put("remote", "Remote");
        
        for (String location : locations) {
            String locationKey = location.toLowerCase().replace(" ", "-");
            locationOptions.put(locationKey, location);
        }
        filters.put("locations", locationOptions);
        
        return filters;
    }
}
